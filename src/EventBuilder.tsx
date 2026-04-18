import React, { useState } from "react";
import type { EventFormData } from "../shared/types/events.ts"
import { formInputStyles, PlainFormField } from "./FormFields";
import type { BoardData } from "../shared/types/bingo";
import { expressApi } from "./express-api";
import EventBoardSelector from "./EventBoardSelector";
import EventTeamsEditor from "./EventTeamsEditor";
import type { ListRecordSummary } from "./ListAllFetchedRecords.tsx";
import { cn } from "./utils.ts";
import type { CreateEventRequest } from "../shared/types/express-api/events.ts";

type EventBuilderProps = {
  event: EventFormData;
  apiFunction: (createEventData: CreateEventRequest) => void;
  availableBoards: ListRecordSummary[];
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

      const { board } = await expressApi.boards.getBoard(boardId)
      setSelectedBoard({
        title: board.title,
        tiles: board.tiles
      })
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
    const createEventData: CreateEventRequest = {
      title: eventDraft.title,
      description: eventDraft.description,
      sourceBoardId: eventDraft.sourceBoardId,
      startAt: startAt.toISOString(),
      endAt: endAt.toISOString(),
      teams: eventDraft.teams,
      settings: {
        requirePasswordToJoin: eventDraft.requirePasswordToJoin,
      },
      inviteData: {
        joinPassword: eventDraft.requirePasswordToJoin ? eventDraft.joinPassword.trim() : null,
      }
    }
    apiFunction(createEventData)
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
          inputClassName={`input[type='text']`}
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

        <div className="flex items-center">
          <span>Require Password To Join</span>
          <button
            type='button'
            onClick={() => setEventDraft(prev => ({ 
              ...prev, 
              requirePasswordToJoin: !prev.requirePasswordToJoin,
              joinPassword: ''
            }))}
            className={cn(
              "w-12 h-6 rounded-full transition bg-gray-300 ml-2",
              eventDraft.requirePasswordToJoin && "bg-green-500"
            )}
          >
            <div
              className={cn(
                "h-6 w-6 bg-white rounded-full transition transform translate-x-0",
                eventDraft.requirePasswordToJoin && "translate-x-6"
              )}
            />
          </button>
        </div>

          {eventDraft.requirePasswordToJoin && (
            <PlainFormField
              name='joinPassword'
              type="password"
              placeholder='Enter Join Password'
              value={eventDraft.joinPassword }
              onChange={onInputChange}
            />
          )}

        
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