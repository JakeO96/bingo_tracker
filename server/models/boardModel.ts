import mongoose, { Schema } from "mongoose"
import { Document } from "mongoose"
import { BoardTileData, IBoardSchema } from "../../shared/types/bingo"


const tileSchema = new Schema<BoardTileData>(
  {
    tileHeader:       { type: String,  required: true },
    tileGoals:        { type: [String], required: true }
  },
  { _id: false }              // omit an _id for each tile (optional)
);


const boardSchema = new mongoose.Schema(
  {
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true],
      ref: "User",
    },
    board: {
      type: [tileSchema],
      required: [true],
    },
  }, 
  {
    timestamps: true,
  }
);

export default mongoose.model<IBoardSchema>('Board', boardSchema, 'boards')