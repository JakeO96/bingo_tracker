import type { Schema } from 'mongoose';
import type { BoardTileData } from './bingo.ts'


export type EventStatus = "draft" | "open" | "started" | "ended";

export type Participant = {
  id: string;
  eventId: string;
  displayName: string;
  rsn?: string;
  teamId?: string;
  userId?: string;
  createdAt: string;
}

export type GoalSubmissionStatus = "pending" | "approved" | "rejected";

export type GoalSubmission = {
  id: string;
  submittedByUserId: string | null;
  screenshotUrls: string[];
  submittedAt: string;
  status: GoalSubmissionStatus;
  reviewedByUserId?: string;
  reviewedAt?: string;
  reviewNote?: string;
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
  interTeamBoardAcces: boolean;
}

export type EventBoardSnapshot = {
  boardId: string | null;
  boardTitle: string;
  boardTiles: BoardTileData[];
}

export type EventData = {
  title: string;
  description: string;
  sourceBoardId: string;
  boardSnapshot?: EventBoardSnapshot;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  teams: EventTeamData[];
  settings: EventSettings;
  status: EventStatus;
}

export interface IEventSchema extends Document {
  _id: Schema.Types.ObjectId;
  ownerId: Schema.Types.ObjectId;
  title: string;
  description: string;
  sourceBoardId: string;
  boardSnapshot?: EventBoardSnapshot;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  teams: EventTeamData[];
  settings: EventSettings;
  status: EventStatus;
  createdAt: Date;
  updatedAt: Date;
}