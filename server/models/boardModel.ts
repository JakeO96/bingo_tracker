import mongoose, { Schema } from "mongoose"
import { IBoardSchema, BoardTileData, } from "../../shared/types/bingo"


const goalSchema = new Schema(
  {
    id: { type: String, required: true},
    text: { type: String, required: false },
    points: { type: Number, required: false }
  },
  { _id: false}
)

export const tileSchema = new Schema<BoardTileData>(
  {
    id: { type: String, required: true },
    title: { type: String,  required: false },
    goals: { 
      type: [goalSchema], 
      required: true,
      default: []
    }
  },
  { _id: false }              // omit an _id for each tile (optional)
)


const boardSchema = new mongoose.Schema(
  {
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
    },
    tiles: {
      type: [tileSchema],
      required: true,
      default: []
    },
  }, 
  {
    timestamps: true,
  }
);

export default mongoose.model<IBoardSchema>('Board', boardSchema, 'boards')