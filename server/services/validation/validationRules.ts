import User from "../../models/userModel"
import Board from "../../models/boardModel"
import Event from "../../models/eventModel"
import Participant from "../../models/participantModel"
import type { ValidationRule } from "./types"
 
export const validationRules = {
  user: {
    email: {
      model: User,
      mode: 'unique',
      scope: 'global',
      normalize: (value: string) => value.trim().toLowerCase()
    },
    username: {
      model: User,
      mode: 'unique',
      scope: 'global',
      normalize: (value: string) => value.trim().toLowerCase()
    }
  },
  board: {
    title: {
      model: Board,
      mode: 'unique',
      scope: 'owner',
      normalize: (value: string) => value.trim(),
      scopeFieldMap: {
        owner: 'ownerId'
      }
    }
  },
  event: {
    title: {
      model: Event,
      mode: 'unique',
      scope: 'owner',
      normalize: (value: string) => value.trim(),
      scopeFieldMap: {
        owner: 'ownerId'
      }
    }
  },
  participant: {
    displayName: {
      model: Participant,
      mode: 'unique',
      scope: 'event',
      normalize: (value: string) => value.trim().toLowerCase(),
      scopeFieldMap: {
        event: 'eventId'
      }
    }
  }
} as const satisfies Record<string, Record<string, ValidationRule>>