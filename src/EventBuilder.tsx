import React, { useState } from "react";
import type { EventData, EventFormData } from "../shared/types/events.ts"
import { PlainFormField } from "./FormFields";
import type { BoardData, BoardSummary, IBoardSchema } from "../shared/types/bingo";
import expressApi from "./express-api";
import EventBoardSelector from "./EventBoardSelector";
import EventTeamsEditor from "./EventTeamsEditor";

type EventBuilderProps = {
  event: EventFormData;
  apiFunction: (event: EventData) => void;
  availableBoards: BoardSummary[];
  preSelectedBoard: BoardData | null;
}

type InputObject = {
  name: string,
  value: string,
  error?: string,
}

export default function Eventbuilder({ event, apiFunction, availableBoards, preSelectedBoard }: EventBuilderProps) {
  const [eventDraft, setEventDraft] = useState<EventFormData>(event)
  const [selectedBoard, setSelectedBoard] = useState<BoardData | null>(preSelectedBoard)
  const [isLoadingBoard, setIsLoadingBoard] = useState<boolean>(false)
  const [boardLoadError, setBoardLoadError] = useState<string | null>(null)
  const formInputStyles = "h-11 p-1 bg-white border border-gray-400 w-full focus:outline-none focus:border-gray-700 focus:ring-1 focus:ring-gray-300"

  const onInputChange = ({ name, value }: InputObject): void => {
    setEventDraft(prev => ({ ...prev, [name]: value }));
  }

  const handleBoardChange = async (boardId: string) => {
    setEventDraft((prev) => ({
      ...prev,
      sourceBoardId: boardId
    }))

    setBoardLoadError(null)

    if (!boardId) {
      setSelectedBoard(null)
      return
    }

    try {
      setIsLoadingBoard(true)

      const boardRecord: IBoardSchema = await expressApi.getBoard(boardId) as IBoardSchema
      const board = {
        title: boardRecord.title,
        tiles: boardRecord.tiles
      }

      setSelectedBoard(board)
    } catch(error) {
      console.error("Failed to load selected board: ", error)
      setSelectedBoard(null)
      setBoardLoadError("Failed to load selected board.")
    } finally {
      setIsLoadingBoard(false)
    }
  }

  const onCreateEventClick = async (evt: React.FormEvent<HTMLFormElement>): Promise<void> => {
    evt.preventDefault()
    console.log(eventDraft)
    const startAt = new Date(`${eventDraft.startDate}T${eventDraft.startTime}`)
    const endAt = new Date(`${eventDraft.endDate}T${eventDraft.endTime}`)
    const event: EventData = {
      title: eventDraft.title,
      description: eventDraft.description,
      sourceBoardId: eventDraft.sourceBoardId,
      boardSnapshot: eventDraft.boardSnapshot,
      startAt: startAt.toISOString(),
      endAt: endAt.toISOString(),
      teams: eventDraft.teams,
      settings: eventDraft.settings,
      status: eventDraft.status
    }
    apiFunction(event)
  }

  return (
    <div className="flex flex-col gap-6">
      <form onSubmit={onCreateEventClick}>
        <h2>Title</h2>
        <PlainFormField
          type='text'
          name='title'
          value={eventDraft.title}
          placeholder='Enter title of event'
          onChange={onInputChange}
          styles={`input[type='text'] ${formInputStyles}`}
        />
        <div>
          <h2>Event Description</h2>
          <textarea
            name='description'
            value={eventDraft.description}
            rows={4}
            placeholder='Enter description of event...'
            onChange={(e) =>
              onInputChange({
                name: e.target.name,
                value: e.target.value,
              })
            }
            className={`${formInputStyles} text-sm resize-none h-full`}        
          />
        </div>
        <div>
          <h2>Starts</h2>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="date"
              name="startDate"
              value={eventDraft.startDate as string}
              onChange={(e) =>
                onInputChange({
                  name: e.target.name,
                  value: e.target.value
                })
              }
              className={`${formInputStyles} cursor-text`}
            />
            <input
              type="time"
              name="startTime"
              value={eventDraft.startTime as string}
              onChange={(e) =>
                onInputChange({
                  name: e.target.name,
                  value: e.target.value
                })
              }
              className={`${formInputStyles} cursor-text`}
            />
          </div>
          <h2>Ends</h2>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="date"
              name="endDate"
              value={eventDraft.endDate as string}
              onChange={(e) =>
                onInputChange({
                  name: e.target.name,
                  value: e.target.value
                })
              }
              className={`${formInputStyles} cursor-text`}
            />
            <input
              type="time"
              name="endTime"
              value={eventDraft.endTime as string}
              onChange={(e) =>
                onInputChange({
                  name: e.target.name,
                  value: e.target.value
                })
              }
              className={`${formInputStyles} cursor-text`}
            />
          </div>
        </div>
        <EventBoardSelector
          boards={availableBoards}
          value={eventDraft.sourceBoardId}
          onChange={handleBoardChange}
          isLoadingBoard={isLoadingBoard}
          error={boardLoadError}
        />
        {selectedBoard && !isLoadingBoard && (
          <div className="rounded-md board border-slate-700 bg-slate-900 p-4">
            <p className="text-sm text-slate-400 mt-1">
              Selected: <span className="text-slate-200">{selectedBoard.title}</span>
            </p>
          </div>
        )}

        <EventTeamsEditor
          teams={eventDraft.teams}
          onChangeTeams={(updatedTeams) => 
            setEventDraft((prev) => ({
              ...prev,
              teams: updatedTeams,
            }))
          }
        />

        
        <div className="flex justify-center items-center w-full gap-2">
          <button
            type="button"
            className="inline-flex h-11 items-center justify-center whitespace-nowrap rounded-full border 
                      border-gray-600 bg-white px-6 text-sm font-semibold text-black transition duration-200 
                      hover:cursor-pointer hover:bg-red-400 hover:text-white hover:border-red-400 
                      focus:outline-none focus:ring-2 focus:ring-red-200 active:scale-[0.98]"
          >
            Cancel
          </button>
          <button
            type='submit'
            className="w-1/3 inline-flex h-11 items-center justify-center whitespace-nowrap rounded-full bg-emerald-500 
                      px-6 text-sm font-semibold text-white transition duration-200 hover:cursor-pointer 
                      hover:brightness-120 focus:outline-none focus:ring-2 focus:ring-emerald-200 active:scale-[0.98]"
          >
            Create Event
          </button>
        </div>
      </form>
    </div>
  )
}