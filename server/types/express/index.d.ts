import { AuthenticatedParticipantPayload, AuthenticatedUserPayload } from "../authTypes"

declare global {
  namespace Express {
    interface Request {
      user?: AuthenticatedUserPayload;
      participant?: AuthenticatedParticipantPayload
    }
  }
}

export {}