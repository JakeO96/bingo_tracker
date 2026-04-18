import asyncHandler from 'express-async-handler'
import { NextFunction, Request, Response } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken';
import { HttpStatusCode } from '../constants';
import { ParticipantSession } from '../../shared/types/participants';
import Participant from '../models/participantModel'

export const optionalValidateParticipantToken = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies?.participantToken

  if (!token) {
    req.participant = undefined
    return next()
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
  
      const participant = await Participant.findOne({ id: participantId, eventId })
  
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
        eventId: participant.eventId.toString(),
        role: participant.role,
        teamId: participant.teamId ?? null,
        userId: participant.userId ? participant.userId.toString() : null,
        sessionId: session.sessionId
      }
      next()
    } catch {
      req.participant = undefined
      next()
    }
})