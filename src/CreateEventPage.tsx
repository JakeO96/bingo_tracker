import type { EventData, EventFormData } from '../shared/types/events.ts';
import Eventbuilder from "./EventBuilder";
import { expressApi } from "./express-api";
import { useLoaderData, useNavigate } from "react-router";

export default function CreateEventPage() {
  const emptyEvent: EventFormData = {
    title: '',
    description: '',
    sourceBoardId: '',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    teams: [
      {
        id: crypto.randomUUID(), 
        name: "", 
        members: [], 
        progress: {
          totalPoints: 0,
          completedGoalsCount: 0,
          completedTilesCount: 0,
           tiles: [] 
        }
      },
      {
        id: crypto.randomUUID(),
        name: "",
        members: [],
        progress: { 
          totalPoints: 0,
          completedGoalsCount: 0,
          completedTilesCount: 0,
          tiles: [] 
        }
      }
    ]
  }
  const navigate = useNavigate()
  const { records } = useLoaderData()
  console.log('in CreateEventPage, boardSummaries from useLoaderData belowvvvv')
  console.log(records)

  const handleCreateEvent = async (draftEvent: EventData) => {
    try{
      console.log('in the handleCreateEvent on the createevent page draftEvent VVVV')
      console.log(draftEvent)
      await expressApi.events.createEvent(draftEvent)
      navigate('/events-created')
    } catch(error) {
      console.error("Failed to create board", error)
    }
  }

  return (
    <Eventbuilder 
      event={emptyEvent} 
      apiFunction={handleCreateEvent} 
      availableBoards={records} 
      preSelectedBoard={null} 
    />
  )
}