import type { EventSummary, EventTeamData, IEventSchema, TeamPageData } from "../events";

export interface CreateEventRequest {
  title: string;
  description: string;
  sourceBoardId: string;
  startAt: string;
  endAt: string;
  teams: EventTeamData[];
  settings: {
    requirePasswordToJoin: boolean;
  }
  inviteData: {
    joinPassword: string | null;
  }
}

export interface CreateEventResponse {
  eventId: string;
}

export interface GetEventResponse {
  eventData: IEventSchema;
}

export interface GetAllEventSummariesForUserResponse {
  eventSummaries: EventSummary[];
}

export interface GetEventSingleTeamDataRequest {
  eventId: string;
  teamId: string;
}
export interface GetEventSingleTeamDataResponse{
  teamPageData: TeamPageData
}