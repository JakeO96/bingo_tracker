import type { Document, Types } from 'mongoose';
import type { BoardTileData } from './bingo.ts'


export type EventStatus = "draft" | "open" | "started" | "ended";

export type Participant = {
  id: string;
  eventId: string;
  displayName: string;
  rsn: string;
  teamId: string | null;
  userId: string | null;
}

export type ParticipantDB = {
  id: string;
  eventId: string;
  displayName: string;
  rsn: string;
  teamId: string | null;
  userId: Types.ObjectId | null;
}

export type GoalSubmissionStatus = "pending" | "approved" | "rejected";

export type GoalSubmission = {
  id: string;
  submittedByUserId: string | null;
  submittedByParticipantId: string | null;
  screenshotUrls: string[];
  submittedAt: Date;
  status: GoalSubmissionStatus;
  reviewedByUserId: string | null;
  reviewedAt: Date | null;
  reviewNote: string | null;
}

export type GoalSubmissionDB = {
  id: string;
  submittedByUserId: Types.ObjectId | null;
  submittedByParticipantId: string | null;
  screenshotUrls: string[];
  submittedAt: Date;
  status: GoalSubmissionStatus;
  reviewedByUserId: Types.ObjectId | null;
  reviewedAt: Date | null;
  reviewNote: string | null;
}

export type TeamGoalProgress = {
  goalId: string;
  isComplete: boolean;
  submissions: GoalSubmission[];
}

export type TeamTileProgress = {
  tileId: string;
  isComplete: boolean;
  goals: TeamGoalProgress[]
}

 export type TeamProgress = {
  tiles: TeamTileProgress[]
}

export type EventTeamData = {
  id: string;
  name: string;
  members: Participant[];
  progress: TeamProgress;
}

export type EventSettings = {
  approvalMode: "admin_only" | "auto";
  joinMode: "open_link" | "team_link";
  visibility: "private" | "public";
  globalPointsLeaderBoard: boolean;
  interTeamBoardAccess: boolean;
}

export type EventBoardSnapshot = {
  boardId: string;
  boardTitle: string;
  boardTiles: BoardTileData[];
}

export type EventBoardSnapshotDB = {
  boardId: Types.ObjectId;
  boardTitle: string;
  boardTiles: BoardTileData[];
}

export type EventFormData = {
  title: string;
  description: string;
  sourceBoardId: string;
  boardSnapshot: EventBoardSnapshot;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  teams: EventTeamData[];
  settings: EventSettings;
  status: EventStatus;
}

export type EventData = {
  title: string;
  description: string;
  sourceBoardId: string;
  boardSnapshot: EventBoardSnapshot;
  startDate: Date | string;
  endDate: Date | string;
  teams: EventTeamData[];
  settings: EventSettings;
  status: EventStatus;
}

export interface IEventSchema extends Document {
  _id: Types.ObjectId;
  ownerId: Types.ObjectId;
  title: string;
  description: string;
  sourceBoardId: Types.ObjectId;
  boardSnapshot: EventBoardSnapshotDB;
  startDate: Date;
  endDate: Date;
  teams: EventTeamData[];
  settings: EventSettings;
  status: EventStatus;
  createdAt: Date;
  updatedAt: Date;
}