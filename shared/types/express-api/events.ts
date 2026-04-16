import type { EventSummary, IEventSchema, TeamPageData } from "../events";

export interface CreateEventResponse {
  eventId: string;
}

export interface GetEventResponse {
  event: IEventSchema;
}

export interface GetAllEventSummariesForUser {
  eventSummaries: EventSummary[];
}

export interface GetEventSingleTeamDataRequest {
  eventId: string;
  teamId: string;
}
export interface GetEventSingleTeamDataResponse{
  teamPageData: TeamPageData
}