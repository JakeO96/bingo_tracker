import type { Document, Types } from 'mongoose';
import type { BoardTileData } from './bingo.ts'

import type { Participant } from './participants.ts'

export type TeamPageData = {
  eventId: string;
  title: string;
  boardSnapshot: EventBoardSnapshot;
  status: EventStatus;
  startAt: string;
  endAt: string;
  team: EventTeamData;
}

export type EventSummary = {
  id: string;
  title: string;
  updatedAt: string;
  createdAt: string;
}

export type EventStatus = "draft" | "open" | "started" | "ended";

export type GoalSubmissionStatus = "pending" | "approved" | "rejected";

export type GoalSubmission = {
  id: string;
  submittedByUserId: string | null;
  submittedByParticipantId: string;
  submittedByParticipantDisplayName: string;
  screenshotUrls: string[];
  submittedAt: Date;
  status: GoalSubmissionStatus;
  reviewedByUserId: string | null;
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
  totalPoints: number;
  completedGoalsCount: number;
  completedTilesCount: number;
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
  joinMode: "general_link" | "team_link";
  visibility: "private" | "public";
  isJoinOpen: boolean;
  requirePasswordToJoin: boolean;
  globalPointsLeaderBoard: boolean;
  interTeamBoardAccess: boolean;
}

export type EventInviteData = {
  joinPasswordHash: string | null;
  generalJoinToken: string | null;
  teamJoinTokens: { teamId: string; token: string }[] | null;
  lastRotatedAt: Date | null;
}

export type EventBoardSnapshot = {
  boardId: string;
  boardTitle: string;
  boardTiles: BoardTileData[];
}

export type EventFormData = {
  title: string;
  description: string;
  sourceBoardId: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  teams: EventTeamData[];
  requirePasswordToJoin: boolean;
  joinPassword: string;
}

export type EventData = {
  title: string;
  description: string;
  sourceBoardId: string;
  boardSnapshot: EventBoardSnapshot | null;
  startAt: Date | string;
  endAt: Date | string;
  participants: Participant[];
  teams: EventTeamData[];
  settings: EventSettings;
  inviteData: EventInviteData;
  status: EventStatus;
}

export interface IEventSchema extends Document {
  _id: Types.ObjectId;
  ownerId: Types.ObjectId;
  title: string;
  description: string;
  sourceBoardId: Types.ObjectId;
  boardSnapshot: EventBoardSnapshot;
  startAt: Date;
  endAt: Date;
  teams: EventTeamData[];
  settings: EventSettings;
  inviteData: EventInviteData;
  status: EventStatus;
  createdAt: Date;
  updatedAt: Date;
}