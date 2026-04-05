import mongoose, { Schema } from "mongoose";
import { IEventSchema } from "../../shared/types/events"
import { tileSchema } from "./boardModel";

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

const participantSchema = new Schema(
  {
    id: {
      type: String,
      required: true
    },
    eventId: {
      type: String,
      required: true
    },
    displayName: {
      type: String,
      required: true
    },
    rsn: {
      type: String,
      required: true
    },
    teamId: {
      type: String,
      default: null
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null
    },
  },
)

const goalSubmissionSchema = new Schema(
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
      default: null
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
    members: {
      type: [participantSchema],
      required: true,
      default: []
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
      enum: ["open_link", "team_link"],
      required: true
    },
    visibility: {
      type: String,
      enum: ["private", "public"],
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