import mongoose, { Schema } from "mongoose";
import { IEventSchema } from "../../shared/types/events"
import { tileSchema } from "./boardModel";
import { string } from "zod";

const eventBoardSnapshotSchema = new Schema(
  {
    boardId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Board",
      required: true
    },
    boardTitle: {
      type: String,
      required: true
    },
    boardTiles: {
      type: [tileSchema],
      required: true,
      default: []
    }
  },
  { _id: false }
)

export const goalSubmissionSchema = new Schema(
  {
    id: {
      type: String,
      required: true
    },
    submittedByUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null
    },
    submittedByParticipantId: {
      type: String,
      required: true
    },
    submittedByParticipantDisplayName: {
      type: String,
      required: true
    },
    screenshotUrls: {
      type: [String],
      required: true,
      default: []
    },
    submittedAt: {
      type: Date,
      required: true
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      required: true
    },
    reviewedByUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null
    },
    reviewedAt: {
      type: Date,
      default: null
    },
    reviewNote: {
      type: String,
      default: null
    }
  },
  { _id: false }
)

const teamGoalProgressSchema = new Schema(
  {
    goalId: {
      type: String,
      required: true
    },
    isComplete: {
      type: Boolean,
      required: true
    },
    submissions: {
      type: [goalSubmissionSchema],
      required: true,
      default: []
    }
  },
  { _id: false }
)

const teamTileProgressSchema = new Schema(
  {
    tileId: {
      type: String,
      required: true
    },
    isComplete: {
      type: Boolean,
      required: true
    },
    goals: {
      type: [teamGoalProgressSchema],
      required: true,
      default: []
    }
  },
  { _id: false }
)

const teamProgressSchema = new Schema(
  {
    totalPoints: {
      type: Number,
      required: true
    },
    completedGoalsCount: {
      type: Number,
      required: true
    },
    completedTilesCount: {
      type: Number,
      required: true
    },
    tiles: {
      type: [teamTileProgressSchema],
      required: true,
      default: []
    }
  },
  { _id: false }
)

const eventTeamDataSchema = new Schema(
  {
    id: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    progress: {
      type: teamProgressSchema,
      required: true,
      default: () => ({ tiles: [] })
    }
  },
  { _id: false }
)

const eventSettingsSchema = new Schema(
  {
    approvalMode: {
      type: String,
      enum: ["admin_only", "auto"],
      required: true
    },
    joinMode: {
      type: String,
      enum: ["general_link", "team_link"],
      required: true
    },
    visibility: {
      type: String,
      enum: ["private", "public"],
      required: true
    },
    isJoinOpen: {
      type: Boolean,
      required: true
    },
    requirePasswordToJoin: {
      type: Boolean,
      required: true
    },
    globalPointsLeaderBoard: {
      type: Boolean,
      required: true
    },
    interTeamBoardAccess: {
      type: Boolean,
      required: true
    },
  },
  { _id: false }
)

const eventInviteDataSchema = new mongoose.Schema(
  {
    joinPasswordHash: {
      type: String,
      default: null
    },
    generalJoinToken: {
      type: String,
      default: null,
      uniqe: true,
      index: true
    },
    teamJoinTokens: {
      type: [
        {
          teamId: { type: string, required: true },
          token: { type: String, required: true},
          _id: false
        }
      ],
      default: null
    },
    lastRotatedAt: {
      type: Date,
      default: null
    }
  },
  { _id: false }
)

const eventSchema = new mongoose.Schema(
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
    description: {
      type: String,
      required: true,
    },
    sourceBoardId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Board",
      required: true
    },
    boardSnapshot: {
      type: eventBoardSnapshotSchema,
      required: true,
    },
    startAt: {
      type: Date,
      required: true,
    },
    endAt: {
      type: Date,
      required: true,
    },
    teams: {
      type: [eventTeamDataSchema],
      required: true,
      default: []
    },
    settings: {
      type: eventSettingsSchema,
      required: true,
    },
    inviteData: {
      type: eventInviteDataSchema,
      required: true
    },
    status: {
      type: String,
      enum: ["draft", "open", "started", "ended"],
      required: true,
    },
  },
  {
    timestamps: true
  }
)

export default mongoose.model<IEventSchema>('Event', eventSchema, 'events')