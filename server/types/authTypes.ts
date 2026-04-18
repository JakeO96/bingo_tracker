export interface AuthenticatedUserPayload {
  email: string;
  username: string;
  id: string;
  sessionId: string;
}

export interface AuthenticatedParticipantPayload {
  participantId: string;
  eventId: string;
  role: string;
  teamId: string | null;
  userId: string | null;
  sessionId: string;
}