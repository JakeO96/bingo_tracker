import type { Schema } from "mongoose";
import type { GoalSubmission } from "./events";

export type BoardGoalData = {
  id: string;
  text: string;
  points: number;
}

export type BoardTileData = {
  id: string;
  title: string;
  goals: BoardGoalData[];
}

export type BoardData = {
  title: string;
  tiles: BoardTileData[];
}

export type BoardSummary = {
  boardId: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IBoardSchema extends Document {
  _id: Schema.Types.ObjectId;
  ownerId: Schema.Types.ObjectId;
  title: string;
  tiles: BoardTileData[];
  createdAt: Date;
  updatedAt: Date;
}

export type GameBoardGoalData = {
  id: string;
  text: string;
  points: number;
  isComplete: boolean;
  submissions: GoalSubmission[];
}

export type GameBoardTileData = {
  id: string;
  title: string;
  isComplete: boolean;
  goals: GameBoardGoalData[];
  completedGoalsCount: number;
  hasPendingSubmissions: boolean;
}

export type GameBoardData = {
  title: string;
  tiles: GameBoardTileData[];
}