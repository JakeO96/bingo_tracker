import type { EventData } from "../../shared/types/events"
import type { CreateEventResponse, GetAllEventSummariesForUser, GetEventResponse, GetEventSingleTeamDataRequest, GetEventSingleTeamDataResponse } from "../../shared/types/api/events"
import { makeApiCall } from "./client"

const createEvent = async (draftEvent: EventData): Promise<CreateEventResponse> =>
  makeApiCall<CreateEventResponse>(
    'POST',
    '/event/create-event',
    { draftEvent },
    "Failed to create board"
  )

const getEvent = async (id: string): Promise<GetEventResponse> =>
  makeApiCall<GetEventResponse>(
    'GET',
    `/event/${id}`,
    {},
    "Failed to get event"
  )

const getAllEventSummariesForUser = async (): Promise<GetAllEventSummariesForUser> =>
  makeApiCall<GetAllEventSummariesForUser>(
    'GET',
    '/event/getAllEventSummariesForUser',
    {},
    "Failed to get user board summaries"
  )

const getEventSingleTeamData = async ({
  eventId, 
  teamId
}: GetEventSingleTeamDataRequest): Promise<GetEventSingleTeamDataResponse> =>
  makeApiCall<GetEventSingleTeamDataResponse>(
    'GET',
    `/event/${eventId}/team/${teamId}`,
    {},
    "Failed to get team data"
  )

export const eventsApi = {
  createEvent,
  getEvent,
  getAllEventSummariesForUser,
  getEventSingleTeamData
}