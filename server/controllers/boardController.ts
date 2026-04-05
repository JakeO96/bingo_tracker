import { NextFunction, Request, Response } from 'express'
import { HttpStatusCode } from '../constants'
import asyncHandler from 'express-async-handler'
import Board from '../models/boardModel'
import User from '../models/userModel'
import type { ActiveUser } from '../models/userModel'
import dotenv from 'dotenv-safe';
dotenv.config();


interface RequestWithUser extends Request {
  user?: ActiveUser;
}

//@desc Create a Board
// record
//@route POST /api/board/create-board
//@access private
const createBoard = asyncHandler( async (req: RequestWithUser, res: Response, next: NextFunction) => {
  const boardData = req.body
  console.log(boardData.title + '``````````````````````````````````````````````````````')
  if (req.user) {
    const ownerRecord = await User.findById(req.user.id );
    if (!ownerRecord) {
      res.status(HttpStatusCode.VALIDATION_ERROR)
      throw new Error("Some user does not exist")
    }
    const board = new Board({
      ownerId: ownerRecord._id,
      title: boardData.title,
      tiles: boardData.tiles,
    })

    try {
      console.log('new board created')
      await board.save()    
    } catch (err) {
      console.log(err)
      return next(err)
    }

    await User.findByIdAndUpdate(ownerRecord._id, { $push: { boardsOwned: board._id } })
    res.status(HttpStatusCode.RECORD_CREATED).json({boardId: board._id})
  }
})

//@desc Get a single Board
// record
//@route GET /api/board/:id
//@access private
const getBoard = asyncHandler( async (req: Request, res: Response) => {
  const board = await Board.findById(req.params.id);
  console.log(`$$$firing in boardController getBoard, board id is ${req.params.id}`)
  if(board) {
    res.status(HttpStatusCode.SUCCESS).json(board);
    console.log(board.toJSON())
  } 
  else {
    res.status(HttpStatusCode.NOT_FOUND);
    throw new Error("Board not found");
  }
})

/*
//@desc Delete a Board
// record
//@route DELETE /api/game/:id
//@access privtae
const deleteGame = asyncHandler( async (req: RequestWithUser, res: Response) => {
  const game= await Board
.findById(req.params.id);
  if (game){
    if(req.user && req.user.id) {
      if(game.playerId.toString() === req.user.id) {
        await Board
      .deleteOne({_id: req.params.id});
        res.status(HttpStatusCode.SUCCESS).json({message: "User successfully deleted"});
      }
      else {
        res.status(HttpStatusCode.FORBIDDEN)
        throw new Error("Forbidden action")
      }
    }
  }
  else {
    res.status(HttpStatusCode.NOT_FOUND);
    throw new Error("User not found");
  }
});
*/

//@desc Get all Board records for a User
//@route GET /api/board/getAllBoardsForUser
//@access private
const getAllBoardsForUser = asyncHandler( async (req: RequestWithUser, res: Response) => {
  if (req.user) {
    console.log(`inside getAllBoardsForUser ownerID is ${req.user.id}`)
    const allUserOwnedBoards = await Board.find({ ownerId: req.user.id}).exec()
    res.status(HttpStatusCode.SUCCESS).json(allUserOwnedBoards)
  }
})

const getAllBoardSummariesForUser = asyncHandler( async (req: RequestWithUser, res: Response) => {
  if (req.user) {
    console.log('Firing in getAllBoardSummaries')
    const boards = await Board.find({ ownerId: req.user.id })
      .select("_id title updatedAt createdAt")
      .sort({ updatedAt: -1})
      .lean()

    console.log('boards below vvvvvvvvvvv')
    console.log(boards)
    const boardSummaries = boards.map((board) => ({
      id: board._id.toString(),
      title: board.title,
      updatedAt: board.updatedAt,
      createdAt: board.createdAt
    }))
    console.log('boardSummaries below vvvvvvvvv')
    console.log(boardSummaries)

    res.status(200).json(boardSummaries)
  } else {
    res.status(401)
    throw new Error("User not authenticated")
  }
})

//@desc Update a specific board
//@route GET /api/board/updateBoard
//@access private
const updateBoard = asyncHandler( async (req: RequestWithUser, res: Response) => {
  const id = req.params.id
  const updates = req.body.updateData

  console.log('inside board controller upateBoard, id below')
  console.log(id)
  console.log('updates below')
  console.log(updates)

  const updatedBoard = await Board.findByIdAndUpdate(
    id,
    updates,
    { new: true,
      runValidators: true
    }
  )

  if (!updatedBoard) {
    res.status(404)
    throw new Error("Board not found")
  }
  console.log('firing right before returning successful update')
  res.status(200).json(updatedBoard)
})

export { createBoard, getBoard, getAllBoardsForUser, getAllBoardSummariesForUser, updateBoard }