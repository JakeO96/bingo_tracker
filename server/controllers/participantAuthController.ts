/*import { Request, Response } from 'express';
import { HttpStatusCode } from '../constants'
import asyncHandler from 'express-async-handler'
import User, { ActiveUser } from "../models/userModel";
import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { Participant } from '../../shared/types/participants';*/

//const ONE_YEAR = 1000 /*ms*/ * 60 /*sec*/ * 60 /*min*/ * 24 /*hr*/ * 365 /*days*/
//ONE_MINUTE = 60 * 1_500 //for testing
/*const TWO_HOURS = 2 * 60 * 60 * 1_000
const ONE_WEEK = 7 * 24 * 60 * 60 * 1_000

interface RequestWithUser extends Request {
  user?: ActiveUser;
}

export const joinEvent = asyncHandler( async (req: RequestWithUser, res: Response) => {
  const { eventId, displayName, inviteCode } = req.body

  if (!eventId) {
    res.status(HttpStatusCode.UNAUTHORIZED).json({ message: "User not authorized" })
    return
  }
  if(!displayName || displayName.trim() === "") {
    res.status(HttpStatusCode.VALIDATION_ERROR).json({ message: "User must choose a valid display name" })
  }

  const now = new Date()

  const session = {
    sessionId: uuidv4(),
    createdAt: now,
    lastSeenAt: now,
    expiresAt: new Date(now.getTime() + ONE_WEEK + ONE_WEEK),
    revokedAt: null,
    ip: req.ip ?? null,
    userAgent: req.get("user-agant") ?? null
  }

  const participant: Participant = {
    id: uuidv4(),
    eventId: eventId,
    teamId: null,
    userId: req.user?.id ?? null,
    displayName: displayName,
    rsn: null,
    role: "player",
    goalSubmissions: [],
    recoveryCodeHash: "",
    sessions: [session]
  }



})*/