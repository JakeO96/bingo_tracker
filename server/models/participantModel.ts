import mongoose, { Schema } from "mongoose"
import { IParticipantSchema } from "../../shared/types/participants"
import { goalSubmissionSchema } from "./eventModel"

const participantSessionSchema = new Schema(
  {
    sessionId: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      required: true
    },
    lastSeenAt: {
      type: Date,
      required: true
    },
    expiresAt: {
      type: Date,
      required: true
    },
    revokedAt: {
      type: Date,
      default: null
    },
    ip: {
      type: String,
      default: null
    },
    userAgent: {
      type: String,
      default: null
    }
  }
)

export const participantSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true
    },
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
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
    displayName: {
      type: String,
      required: true
    },
    rsn: {
      type: String,
      default: null
    },
    role: {
      type: String,
      enum: ["player", "captain", "admin"],
      required: true
    },
    goalSubmissions: {
      type: [goalSubmissionSchema],
      default: []
    },
    recoverCodeHash: {
      type: String,
      required: true
    },
    sessions: {
      type: [participantSessionSchema],
      default: []
    },
  },
  { timestamps: true}
)

export default mongoose.model<IParticipantSchema>('Participant', participantSchema, 'participants')