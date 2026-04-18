import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler"
import { HttpStatusCode } from "../constants";
import jwt, { JwtPayload, TokenExpiredError } from "jsonwebtoken";
import { ParticipantSession } from "../../shared/types/participants";

interface AuthenticatedParticipant {
  participantId: string;
  eventId: string;
  role: string;
  teamId: string | null;
  userId: string | null;
  sessionId: string;
}

interface RequestWithParticipant extends Request {
  participant?: AuthenticatedParticipant;
}

const validateParticipantTokenCallback = async (
  req: RequestWithParticipant,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.participantToken 

  if(!token) {
    res.status(HttpStatusCode.UNAUTHORIZED).json({ message: "Participant not authorized "})
    return
  }

  const secret = process.env.JWT_PARTICIPANT_SECRET
  if (!secret) {
    res.status(HttpStatusCode.SERVER_ERROR).json({ message: "Server misconfiguration" })
    return
  }

  try {
    const decoded = await new Promise<JwtPayload>((resolve, reject) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      jwt.verify(token, secret, (err: any, payload: any) => {
        if (err) return reject(err)
        resolve(payload as JwtPayload)
      })
    })

    const participantId = decoded.participant?.participantId
    const eventId = decoded.participant?.eventId
    const sessionId = decoded.participant?.sessionId

    if (!participantId || !eventId || !sessionId) {
      res.status(HttpStatusCode.UNAUTHORIZED).json({ message: "Invalid participant token payload" })
      return
    }

    const participant = await participantId.findOne({ id: participantId, eventId })

    if (!participant) {
      res.status(HttpStatusCode.UNAUTHORIZED).json({ message: "Participant not found" })
      return
    }
    const session = participant.sessions.find(
      (sessionRecord: ParticipantSession) =>
        sessionRecord.sessionId === sessionId &&
        sessionRecord.revokedAt === null &&
        sessionRecord.expiresAt > new Date()
    )

    if (!session) {
      res.status(HttpStatusCode.UNAUTHORIZED).json({ message: "Invalid participant session" })
      return
    }

    session.lastSeenAt = new Date()
    await participant.save()

    req.participant = {
      participantId: participant.id,
      eventId: participant.eventId,
      role: participant.role,
      teamId: participant.teamId ?? null,
      userId: participant.userId ? participant.userId.toString() : null,
      sessionId: session.sessionId
    }
    next()
  } catch (err) {
    if (err instanceof TokenExpiredError) {
      res.status(HttpStatusCode.UNAUTHORIZED).json({ message: 'Session has expired' })
      return
    }

    res.status(HttpStatusCode.UNAUTHORIZED).json({ message: "Participant not authorized" })
  }
}

const validateParticipantToken = asyncHandler(validateParticipantTokenCallback)

export { validateParticipantToken }