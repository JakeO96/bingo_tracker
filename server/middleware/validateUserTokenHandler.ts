/* eslint-disable prefer-const */
import { Request, Response, NextFunction } from 'express';
import { HttpStatusCode } from '../constants'
import asyncHandler from 'express-async-handler'
import jwt, { JwtPayload, TokenExpiredError } from 'jsonwebtoken';
import User from '../models/userModel'

interface RequestWithUser extends Request {
  user?: string | object;
}

const validateUserTokenCallback = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  const token = req.cookies.userToken
  if (!token) {
    res.status(HttpStatusCode.UNAUTHORIZED).json({ message: 'User not authorized '})
    return
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    if (err instanceof TokenExpiredError) {
      res.status(HttpStatusCode.UNAUTHORIZED).json({ message: 'Session has expired' })
      return
    }
    res.status(HttpStatusCode.UNAUTHORIZED).json({ message: 'User not authorized from validateToken' })
    return
  }
}

const validateUserToken = asyncHandler(validateUserTokenCallback)

export { validateUserToken }