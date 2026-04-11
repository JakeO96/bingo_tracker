import mongoose, { Schema } from "mongoose";
import { Document } from "mongoose";
import { IBoardSchema } from "../../shared/types/bingo";
import { IEventSchema } from "../../shared/types/events";

export interface IUser extends Document {
  email: string;
  username: string;
  password: string;
  boardsOwned: Array<IBoardSchema>;
  boardsJoined: Array<IBoardSchema>;
  eventsOwned: Array<IEventSchema>;
  eventsJoined: Array<IEventSchema>;
  refreshTokens: string[];
  invalidatedTokens: string[];
  session: {
    sessionId: string;
    current: boolean;
    startTime: Date;
    endTime: Date | null;
  };
}
export interface ActiveUser extends IUser {
  id?: string
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "add email"],
      unique: [true, "email already in use"]
    },
    username: {
      type: String,
      required: [true, "add username"],
    },
    password: {
      type: String,
      required: [true, "add password"]
    },
    boardsOwned: [{
      type: Schema.Types.ObjectId,
      ref: 'Board',
    }],
    boardsJoined: [{
      type: Schema.Types.ObjectId,
      ref: 'Board',
    }],
    eventsOwned: [{
      type: Schema.Types.ObjectId,
      ref: 'Event',
    }],
    eventsJoined: [{
      type: Schema.Types.ObjectId,
      ref: 'Event',
    }],
    refreshTokens: {
      type: [String]
    },
    invalidatedTokens: {
      type: [String]
    },
    session: {
      sessionId: {
        type: String,
        default: null,
      },
      current: {
        type: Boolean,
        default: false,
      },
      startTime: {
        type: Date,
        default: null,
      },
      endTime: {
        type: Date,
        default: null,
      },
    },
  }, 
  {
    timestamps: true,
  }
);

export default mongoose.model<IUser>('User', userSchema);
