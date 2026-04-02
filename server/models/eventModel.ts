import mongoose, { Schema } from "mongoose";
import { IEventSchema, EventBoardSnapshot, EventTeamData, Participant, TeamProgress, TeamTileProgress, TeamGoalProgress, GoalSubmission, EventSettings } from "../../shared/types/events"
import { tileSchema } from "./boardModel";

const eventBoardSnapshotSchema = new Schema<EventBoardSnapshot>(
  {
    boardId: {
      type: mongoose.Schema.Types.ObjectId,
      red: "Board",
      required: true,
      default: null
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

const participantSchema = new Schema<Participant>(
  {
    id: {
      type: String,
      required: true
    },
    eventId: {
      type: String,
      reqiured: true
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
      required: true
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      default: null
    },
  },
  { timestamps: true, _id: false }
)

const goalSubmissionSchema = new Schema<GoalSubmission>(
  {
    id: {
      type: String,
      required: true
    },
    submittedByUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      default: null
    },
    screenshotUrls: {
      type: [String],
      required: true,
      default: []
    },
    submittedAt: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ["draft", "open", "started", "ended"],
      required: true
    },
    reviewedByUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      default: null
    },
    reviewedAt: {
      type: Date,
      required: true,
      default: null
    },
    reviewNote: {
      type: String,
      required: true,
      default: null
    }
  },
  { _id: false }
)

const teamGoalProgressSchema = new Schema<TeamGoalProgress>(
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

const teamTileProgressSchema = new Schema<TeamTileProgress>(
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

const teamProgressSchema = new Schema<TeamProgress>(
  {
    tiles: {
      type: [teamTileProgressSchema],
      required: true,
      default: []
    }
  },
  { _id: false }
)

const eventTeamDataSchema = new Schema<EventTeamData>(
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
      required: true
    }
  },
  { _id: false }
)

const eventSettingsSchema = new Schema<EventSettings>(
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
    interTeamBoardAcces: {
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
      required: true,
      default: null
    },
    boardSnapshot: {
      type: eventBoardSnapshotSchema,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
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