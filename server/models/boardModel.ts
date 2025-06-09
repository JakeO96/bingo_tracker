import mongoose, { Schema } from "mongoose";
import { Document } from "mongoose";

export interface IBoard extends Document {
  ownerId: Schema.Types.ObjectId;
  boardId: Schema.Types.ObjectId;
  board: Tile[];
}

 type Tile = {
  tileHeader: string;
  tileGoals: string[];
}

const tileSchema = new Schema<Tile>(
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

export default mongoose.model<IBoard>('Board', boardSchema, 'boards');