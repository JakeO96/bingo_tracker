import type { CreateEventRequest, CreateEventResponse, GetAllEventSummariesForUserResponse, GetEventResponse, GetEventSingleTeamDataRequest, GetEventSingleTeamDataResponse } from "../../shared/types/express-api/events"
import { makeApiCall } from "./client"

const createEvent = async (createEventData: CreateEventRequest): Promise<CreateEventResponse> =>
  makeApiCall<CreateEventResponse>(
    'POST',
    '/event/create-event',
    "Failed to create board",
    createEventData,
  )

const getEvent = async (id: string): Promise<GetEventResponse> =>
  makeApiCall<GetEventResponse>(
    'GET',
    `/event/${id}`,
    "Failed to get event"
  )

const getAllEventSummariesForUser = async (): Promise<GetAllEventSummariesForUserResponse> =>
  makeApiCall<GetAllEventSummariesForUserResponse>(
    'GET',
    '/event/getAllEventSummariesForUser',
    "Failed to get user board summaries"
  )

const getEventSingleTeamData = async ({
  eventId, 
  teamId
}: GetEventSingleTeamDataRequest): Promise<GetEventSingleTeamDataResponse> =>
  makeApiCall<GetEventSingleTeamDataResponse>(
    'GET',
    `/event/${eventId}/team/${teamId}`,
    "Failed to get team data"
  )

export const eventsApi = {
  createEvent,
  getEvent,
  getAllEventSummariesForUser,
  getEventSingleTeamData
}