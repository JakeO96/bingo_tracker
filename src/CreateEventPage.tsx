import type { EventFormData } from '../shared/types/events.ts';
import type { CreateEventRequest } from '../shared/types/express-api/events.ts';
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
    ],
    requirePasswordToJoin: false,
    joinPassword: ''
  }
  const navigate = useNavigate()
  const { records } = useLoaderData()
  console.log('in CreateEventPage, boardSummaries from useLoaderData belowvvvv')
  console.log(records)

  const handleCreateEvent = async (createEventData: CreateEventRequest) => {
    try{
      console.log('in the handleCreateEvent on the createevent page draftEvent VVVV')
      console.log(createEventData)
      const createEventResponse = await expressApi.events.createEvent(createEventData)
      console.log(`in handleCreateEvent createEventResponse: ${JSON.stringify(createEventResponse)}`)
      navigate(`/event/${createEventResponse.eventId}`)
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