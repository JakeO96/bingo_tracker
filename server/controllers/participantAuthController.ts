import { Request, Response } from 'express';
import { HttpStatusCode } from '../constants'
import asyncHandler from 'express-async-handler'
import { ActiveUser } from "../models/userModel";
import Participant from "../models/participantModel"
import jwt, { JwtPayload, TokenExpiredError } from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { generateRecoveryPhrase, hashRecoveryPhrase } from '../utils/join-event';
import Event from '../models/eventModel'
import bcrypt from 'bcrypt'


//const ONE_YEAR = 1000 /*ms*/ * 60 /*sec*/ * 60 /*min*/ * 24 /*hr*/ * 365 /*days*/
//ONE_MINUTE = 60 * 1_500 //for testing
//const TWO_HOURS = 2 * 60 * 60 * 1_000
const ONE_WEEK = 7 * 24 * 60 * 60 * 1_000

interface RequestWithUser extends Request {
  user?: ActiveUser;
}

export const joinEvent = asyncHandler( async (req: RequestWithUser, res: Response) => {
  const { displayName, joinPassword, joinToken } = req.body
  console.log(displayName, joinPassword, joinToken)

  if (!joinToken) {
    res.status(HttpStatusCode.UNAUTHORIZED).json({ message: "User not authorized" })
    return
  }
  if(!displayName || displayName.trim() === "") {
    res.status(HttpStatusCode.BAD_REQUEST).json({ message: "User must choose a valid display name" })
    return
  }

  const event = await Event.findOne({ 
    "inviteData.generalJoinToken": joinToken 
  })
  if (!event) {
    res.status(HttpStatusCode.NOT_FOUND).json({ message: "Invalid or expired join link"})
    return
  }
  /*if(!event.settings.isJoinOpen || event.status === 'ended' || event.status === 'draft') {
    res.status(HttpStatusCode.FORBIDDEN).json({ message: "Event is currently closed to new participants "})
    return
  }*/
  if(event.settings.requirePasswordToJoin) {
    if( !joinPassword) {
      res.status(HttpStatusCode.BAD_REQUEST).json({ message: "No Password was sent"})
      return
    }

    if (!event.inviteData.joinPasswordHash) {
      res.status(HttpStatusCode.SERVER_ERROR).json({ message: "Event join password is misconfigured"})
      return
    }

    const correctPassword = await bcrypt.compare(joinPassword, event.inviteData.joinPasswordHash)
    if (!correctPassword) {
      res.status(HttpStatusCode.UNAUTHORIZED).json({ message: "Invalid join password" })
      return
    }
  }

  const now = new Date()

  const recoveryPhrase = generateRecoveryPhrase(3)
  const recoveryCodeHash = await hashRecoveryPhrase(recoveryPhrase)

  const session = {
    sessionId: uuidv4(),
    createdAt: now,
    lastSeenAt: now,
    expiresAt: new Date(now.getTime() + ONE_WEEK),
    revokedAt: null,
    ip: req.ip ?? null,
    userAgent: req.get("user-agant") ?? null
  }

  const participant = {
    id: uuidv4(),
    eventId: event._id,
    teamId: null,
    userId: req.user?.id ?? null,
    displayName: displayName,
    rsn: null,
    role: "player",
    goalSubmissions: [],
    recoveryCodeHash: recoveryCodeHash,
    sessions: [session]
  }

  try {
    const participantRecord = new Participant(participant)
    await participantRecord.save()
  } catch (error) {
    res.status(HttpStatusCode.SERVER_ERROR)
    throw new Error(`Problem creating participant record ${error}`)
  }

  const accessSecret = process.env.JWT_PARTICIPANT_SECRET
  const refreshSecret = process.env.JWT_PARTICIPANT_REFRESH_SECRET

  if (!accessSecret || !refreshSecret) {
    res.status(HttpStatusCode.SERVER_ERROR)
    throw new Error("Server misconfiguration")
  }

  const participantAccessToken = jwt.sign(
    {
      participant: {
        participantId: participant.id,
        eventId: event._id,
        essionId: session.sessionId
      }
    },
    accessSecret,
    { expiresIn: "15m" }
  )

  const participantRefreshToken = jwt.sign(
    {
      participant: {
        participantId: participant.id,
        eventId: event._id,
        sessionId: session.sessionId
      }
    },
    refreshSecret,
    { expiresIn: "7d"}
  )

  const FIFTEEN_MINUTES = 15 * 60 * 1000

  res.cookie("participantToken", participantAccessToken, {
    httpOnly: true,
    sameSite: "none",
    secure: true,
    maxAge: FIFTEEN_MINUTES
  })

  res.cookie("participantRefreshToken", participantRefreshToken, {
    httpOnly: true,
    sameSite: "none",
    secure: true,
    maxAge: ONE_WEEK
  })

  res.status(HttpStatusCode.SUCCESS).json({
    participant: {
      id: participant.id,
      eventId: event._id,
      teamId: participant.teamId,
      userId: participant.userId,
      displayName: participant.displayName,
    },
    recoveryPhrase
  })
})

interface ParticipantRefreshPayload extends JwtPayload {
  participant?: {
    participantId?: string;
    eventId?: string;
    sessionId?: string;
  }
}
export const refreshParticipant = asyncHandler( async (req: Request, res: Response ) => {
  const refreshToken  = req.cookies.participantRefreshToken

  const accessSecret = process.env.JWT_PARTICIPANT_SECRET
  const refreshSecret = process.env.JWT_PARTICIPANT_REFRESH_SECRET

  if (!refreshToken || !refreshSecret || !accessSecret) {
    res.status(HttpStatusCode.UNAUTHORIZED).json({ message: "Paricipant not authorized "})
    return
  }

  try {
    const decoded = await new Promise<ParticipantRefreshPayload>((resolve, reject) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      jwt.verify(refreshToken, refreshSecret, (err: any, payload: any) => {
        if (err) {
          return reject(err)
        }
        resolve(payload as ParticipantRefreshPayload)
      })
    })

    const participantId = decoded.participant?.participantId
    const eventId = decoded.participant?.eventId
    const sessionId = decoded.participant?.sessionId

    if (!participantId || !eventId || !sessionId) {
      res.status(HttpStatusCode.UNAUTHORIZED).json({ message: "Invalid participant refresh token payload "})
      return
    }

    const participant = await Participant.findOne({ id: participantId, eventId})

    if (!participant) {
      res.status(HttpStatusCode.UNAUTHORIZED).json({ message: "Participant not authorized" })
      return
    }

    const now = new Date()

    const session = participant.sessions.find(
      (sessionRecord) =>
        sessionRecord.sessionId === sessionId &&
        sessionRecord.revokedAt === null &&
        sessionRecord.expiresAt > now
    )

    if (!session) {
      res.clearCookie("participantToken")
      res.clearCookie("participantRefreshToken")
      res.status(HttpStatusCode.UNAUTHORIZED).json({ message: "Invalid or expired participant session" })
      return
    }

    session.lastSeenAt = now
    await participant.save()

    const accessToken = jwt.sign(
      {
        participant: {
          participantId: participant.id,
          eventId: participant.eventId,
          sessionId: session.sessionId
        }
      },
      accessSecret,
      { expiresIn: "15m" }
    )

    const newRefreshToken = jwt.sign(
      {
        participant: {
          participantId: participant.id,
          eventId: participant.eventId,
          sessionId: session.sessionId
        }
      },
      refreshSecret,
      { expiresIn: "7d" }
    )

    const FIFTEEN_MINUTES = 15 * 60 * 1000

    res.cookie("participantToken", accessToken, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: FIFTEEN_MINUTES
    })

    res.cookie("participantRefreshToken", newRefreshToken, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: ONE_WEEK
    })

    res.sendStatus(HttpStatusCode.NO_CONTENT)
  } catch (error) {
    console.log("refreshParticipant error:", error)
    res.clearCookie("participantToken")
    res.clearCookie("participantRefreshToken")

    if (error instanceof TokenExpiredError) {
      res.status(HttpStatusCode.UNAUTHORIZED).json({
        message: "Session TokenExpiredError. please rejoin."
      })
      return
    }

    res.status(HttpStatusCode.UNAUTHORIZED).json({
      message: "Participant not authorized"
    })
  }
})

export const getJoinEventPageData = asyncHandler( async (req: Request, res: Response ) => {
  const joinToken = req.params.joinToken

  if (!joinToken) {
    res.status(HttpStatusCode.BAD_REQUEST).json({ message: "Join token is required"})
    return
  }

  const joinEventData = await Event.findOne({ "inviteData.generalJoinToken": joinToken })
    .select("settings.requirePasswordToJoin title")
    .lean()

  if (!joinEventData) {
    res.status(HttpStatusCode.BAD_REQUEST).json({ message: "JoinToken invalid"})
    return
  }

  console.log(joinEventData)

  res.status(HttpStatusCode.SUCCESS).json({
    title: joinEventData.title,
    requirePasswordToJoin: joinEventData.settings.requirePasswordToJoin
  }) 
  return
})