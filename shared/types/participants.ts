import { Types } from "mongoose";
import type { GoalSubmission } from "./events";

export type ParticipantRole = "player" | "captain" | "admin"

export interface ParticipantSession {
  sessionId: string;
  createdAt: Date;
  lastSeenAt: Date;
  expiresAt: Date;
  revokedAt: Date | null;
  ip: string | null;
  userAgent: string | null;
}

export type Participant = {
  id: string;
  eventId: string;
  teamId: string | null;
  userId: string | null;
  displayName: string;
  rsn: string | null;
  role: ParticipantRole;
  goalSubmissions: GoalSubmission[]| null;
  recoveryCodeHash: string;
  sessions: ParticipantSession[];
}

export interface IParticipantSchema {
  id: string;
  eventId: Types.ObjectId;
  teamId: string | null;
  userId: Types.ObjectId | null;
  displayName: string;
  rsn: string;
  role: ParticipantRole;
  goalSubmissions: GoalSubmission[] | null;
  recoveryCodeHash: string;
  sessions: ParticipantSession[];
  createdAt: Date;
  updatedAt: Date;
}


