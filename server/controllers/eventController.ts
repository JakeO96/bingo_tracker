import { NextFunction, Request, Response } from 'express'
import { HttpStatusCode } from '../constants'
import asyncHandler from 'express-async-handler'
import Board from '../models/boardModel'
import User from '../models/userModel'
import Event from '../models/eventModel'
import type { ActiveUser } from '../models/userModel'
import dotenv from 'dotenv-safe';
import mongoose from 'mongoose'
dotenv.config();


interface RequestWithUser extends Request {
  user?: ActiveUser;
}

//@desc Create a Board
// record
//@route POST /api/event/create-event
//@access private
const createEvent = asyncHandler( async (req: RequestWithUser, res: Response, next: NextFunction) => {
  const eventData = req.body.draftEvent

  console.log('eventData vvvvv in createEvent')
  console.log(eventData)
  if (req.user) {
    const ownerRecord = await User.findById(req.user.id)
    if (!ownerRecord) {
      console.log('hit in no ownerRecord')
      res.status(HttpStatusCode.VALIDATION_ERROR)
      throw new Error("Some user does not exist")
    }

    if (!mongoose.Types.ObjectId.isValid(eventData.sourceBoardId)) {
      console.log('hit in sourceBoardIf validation')
      res.status(HttpStatusCode.VALIDATION_ERROR)
      throw new Error("Invalid board ID format")
    }
    
    const sourceBoard = await Board.findById(eventData.sourceBoardId)
    console.log('hit in no source board record')
    if (!sourceBoard) {
      res.status(HttpStatusCode.VALIDATION_ERROR)
      throw new Error("The source board does not exist")
    }

    const event = new Event({
      ownerId: ownerRecord._id,
      title: eventData.title,
      description: eventData.description,
      sourceBoardId: sourceBoard._id,
      boardSnapshot: {
        boardId: eventData.sourceBoardId,
        boardTitle: sourceBoard.title,
        boardTiles: sourceBoard.tiles
      },
      startAt: eventData.startAt,
      endAt: eventData.endAt,
      teams: eventData.teams,
      settings: eventData.settings,
      status: eventData.status
    })

    try {
      console.log('new board created')
      await event.save()    
    } catch (err) {
      console.log(err)
      return next(err)
    }

    await User.findByIdAndUpdate(ownerRecord.id, { $push: { eventsOwned: event._id }})
    res.status(HttpStatusCode.RECORD_CREATED).json({ eventId: event._id })
  }
})

const getAllEventSummariesForUser = asyncHandler( async (req: RequestWithUser, res: Response) => {
  if (req.user) {
    console.log('Firing in getAllBoardSummaries')
    const events = await Event.find({ ownerId: req.user.id })
      .select("_id title updatedAt createdAt")
      .sort({ updatedAt: -1})
      .lean()

    console.log('events below vvvvvvvvvvv')
    console.log(events)
    const eventSummaries = events.map((board) => ({
      id: board._id.toString(),
      title: board.title,
      updatedAt: board.updatedAt,
      createdAt: board.createdAt
    }))
    console.log('eventSummaries below vvvvvvvvv')
    console.log(eventSummaries)

    res.status(200).json(eventSummaries)
  } else {
    res.status(401)
    throw new Error("User not authenticated")
  }
})

export { createEvent, getAllEventSummariesForUser }