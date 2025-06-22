import type { Schema } from "mongoose";

 export type BoardTileData = {
  tileHeader: string;
  tileGoals: string[];
}

export interface IBoardSchema extends Document {
  ownerId: Schema.Types.ObjectId
  boardId: Schema.Types.ObjectId
  board: BoardTileData[]
}