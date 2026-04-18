import asyncHandler from 'express-async-handler'
import { NextFunction, Request, Response } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken';
import { HttpStatusCode } from '../constants';
import User from '../models/userModel'

export const optionalValidateUserToken = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies?.userToken

  if (!token) {
    req.user = undefined
    return next()
  }

  const secret = process.env.JWT_USER_SECRET
  if (!secret) {
    res.status(HttpStatusCode.SERVER_ERROR).json({ message: 'Server misconfiguration'})
    return
  }
  
  try {
    const decoded = await new Promise<JwtPayload>((resolve, reject) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      jwt.verify(token, secret, (err: any, payload: any) => {
        if (err) {
          return reject(err)
        }
        resolve(payload as JwtPayload)
      })
    })
    req.user = decoded.user
    const sessionId = decoded.user.sessionId
    const user = await User.findById(decoded.user.id)
    if (user && 
        user.session.sessionId === sessionId &&
        user.session.endTime === null
    ) {
      next()
      return
    }
    res.status(HttpStatusCode.UNAUTHORIZED).json({ message: 'Invalid session from validateToken' })
    return
  } catch {
    req.user = undefined
    next()
  }
})