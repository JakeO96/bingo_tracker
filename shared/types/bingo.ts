import type { Schema } from "mongoose";

export type GoalData = {
  id: string;
  text: string;
  points: number;
}

export type TileData = {
  id: string;
  title: string;
  goals: GoalData[];
}

export type BoardData = {
  title: string;
  tiles: TileData[];
}

export interface IBoardSchema extends Document {
  boardTitle: string;
  ownerId: Schema.Types.ObjectId
  boardId: Schema.Types.ObjectId
  title: string
  board: TileData[]
}