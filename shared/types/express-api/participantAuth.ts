export interface JoinEventRequest {
  joinToken: string;
  displayName: string;
  joinPassword: string | null;
}

type JoinEventParticipantData = {
  id: string;
  eventId: string;
  teamId: string;
  userId: string;
  displayName: string;
}

export interface JoinEventResponse {
  participant: JoinEventParticipantData;
  recoveryPhrase: string;
}

export interface GetJoinEventPageDataResponse {
  title: string;
  requirePasswordToJoin: boolean;
}