import type { Schema } from "mongoose";

 export type BoardTileData = {
  tileHeader: string;
  tileGoals: string[];
}

export type BingoBoard = BoardTileData[]

export interface IBoardSchema extends Document {
  boardTitle: string;
  ownerId: Schema.Types.ObjectId
  boardId: Schema.Types.ObjectId
  title: string
  board: BoardTileData[]
}