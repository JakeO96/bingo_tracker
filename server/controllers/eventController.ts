import { NextFunction, Request, Response } from 'express'
import { HttpStatusCode } from '../constants'
import asyncHandler from 'express-async-handler'
import Board from '../models/boardModel'
import User from '../models/userModel'
import Event from '../models/eventModel'
import type { ActiveUser } from '../models/userModel'
import dotenv from 'dotenv-safe';
import mongoose from 'mongoose'
import { createInitialTeamProgress } from '../utils/create-event'
import { EventBoardSnapshot } from '../../shared/types/events'
import bcrypt from 'bcrypt'
import crypto from 'crypto'
dotenv.config()


interface RequestWithUser extends Request {
  user?: ActiveUser;
}

//@desc Create a Board
// record
//@route POST /api/event/create-event
//@access private
const createEvent = asyncHandler( async (req: RequestWithUser, res: Response, next: NextFunction) => {
  const createEventData = req.body

  console.log('eventData vvvvv in createEvent')
  console.log(createEventData)
  if (req.user) {
    const ownerRecord = await User.findById(req.user.id)
    if (!ownerRecord) {
      console.log('hit in no ownerRecord')
      res.status(HttpStatusCode.BAD_REQUEST)
      throw new Error("Some user does not exist")
    }

    if (!mongoose.Types.ObjectId.isValid(createEventData.sourceBoardId)) {
      console.log('hit in sourceBoardIf validation')
      res.status(HttpStatusCode.BAD_REQUEST)
      throw new Error("Invalid board ID format")
    }
    
    const sourceBoard = await Board.findById(createEventData.sourceBoardId)
    if (!sourceBoard) {
      console.log('hit in no source board record')
      res.status(HttpStatusCode.BAD_REQUEST)
      throw new Error("The source board does not exist")
    }

    const startAtDate = new Date(createEventData.startAt)
    const endAtDate = new Date(createEventData.endAt)
    const boardSnapshot: EventBoardSnapshot = {
        boardId: createEventData.sourceBoardId,
        boardTitle: sourceBoard.title,
        boardTiles: sourceBoard.tiles
      }
    const teamsWithInitializedProgress = createInitialTeamProgress(boardSnapshot, createEventData.teams)
    
    if (createEventData.settings.requirePasswordToJoin && !createEventData.inviteData.joinPassword) {
      res.status(HttpStatusCode.BAD_REQUEST)
      throw new Error("Password is required when requirePasswordToJoin is true")
    }

    let hashedJoinPassword: string | null = null
    if (createEventData.settings.requirePasswordToJoin) {
      const saltRounds = process.env.SALT_ROUNDS ? parseInt(process.env.SALT_ROUNDS, 10) : 10
      hashedJoinPassword = await bcrypt.hash(createEventData.inviteData.joinPassword, saltRounds)
    }

    const settings = {
      approvalMode: "admin_only",
      joinMode: "general_link",
      visibility: "private",
      isJoinOpen: false,
      requirePasswordToJoin: createEventData.settings.requirePasswordToJoin,
      globalPointsLeaderBoard: true,
      interTeamBoardAccess: false
    }

    const inviteData = {
        joinPasswordHash: hashedJoinPassword,
        generalJoinToken: crypto.randomBytes(12).toString('base64url'),
        teamJoinTokens: null,
        lastRotatedAt: null
    }

    const event = new Event({
      ownerId: ownerRecord._id,
      title: createEventData.title,
      description: createEventData.description,
      sourceBoardId: sourceBoard._id,
      boardSnapshot: boardSnapshot,
      startAt: startAtDate,
      endAt: endAtDate,
      participants: [],
      teams: teamsWithInitializedProgress,
      settings,
      inviteData,
      status: 'draft'
    })

    try {
      console.log('new board created')
      await event.save()    
    } catch (err) {
      console.log(err)
      return next(err)
    }

    console.log('before successful event creation return)')
    await User.findByIdAndUpdate(ownerRecord.id, { $push: { eventsOwned: event._id }})
    res.status(HttpStatusCode.RECORD_CREATED).json({ eventId: event._id.toString() })
  }
})

const getEvent = asyncHandler( async (req: RequestWithUser, res: Response) => {
  const event = await Event.findById(req.params.id);
  console.log(`$$$firing in eventController getEvent, event id is ${req.params.id}`)
  if(event) {
    res.status(HttpStatusCode.SUCCESS).json(event);
    console.log(event.toJSON())
  } 
  else {
    res.status(HttpStatusCode.NOT_FOUND);
    throw new Error("Event not found");
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
    const eventSummaries = events.map((event) => ({
      id: event._id.toString(),
      title: event.title,
      updatedAt: event.updatedAt,
      createdAt: event.createdAt
    }))
    console.log('eventSummaries below vvvvvvvvv')
    console.log(eventSummaries)

    res.status(200).json(eventSummaries)
  } else {
    res.status(401)
    throw new Error("User not authenticated")
  }
})

const getEventSingleTeamData = asyncHandler( async (req: RequestWithUser, res: Response) => {
  const eventId = req.params.eventId
  const teamId = req.params.teamId

  const event = await Event.findById(eventId)
    .select("title boardSnapshot status startAt endAt teams")
    .lean()
    .exec()

  if (!event) {
    res.status(HttpStatusCode.NOT_FOUND);
    throw new Error("Event not found");
  }

  const team = event.teams.find((t) => t.id === teamId)

  if (!team) {
    res.status(HttpStatusCode.NOT_FOUND);
    throw new Error("Team not found");
  }

  const teamPageData = {
    eventId: eventId,
    title: event.title,
    boardSnapshot: event.boardSnapshot,
    status: event.status,
    startAt: event.startAt,
    endAt: event.endAt,
    team
  }

  res.status(200).json(teamPageData)
})

export { createEvent, getEvent, getAllEventSummariesForUser, getEventSingleTeamData }