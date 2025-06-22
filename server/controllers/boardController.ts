import { NextFunction, Request, Response } from 'express'
import { HttpStatusCode } from '../constants'
import asyncHandler from 'express-async-handler'
import Board from '../models/boardModel'
import User from '../models/userModel'
import type { ActiveUser } from '../models/userModel'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv-safe';
dotenv.config();


interface RequestWithUser extends Request {
  user?: ActiveUser;
}

//@desc Create a Board
// record
//@route POST /api/game/create-game
//@access private
const createBoard = asyncHandler( async (req: RequestWithUser, res: Response, next: NextFunction) => {
  console.log("createGame in express-api firing")
  const boardData = req.body

  if (req.user) {
    const ownerRecord = await User.findById(req.user.id );
    if (!ownerRecord) {
      res.status(HttpStatusCode.VALIDATION_ERROR)
      throw new Error("Some user does not exist")
    }

    const board = new Board ({
      ownerId: ownerRecord._id,
      board: boardData.board,
    })

    try {
      console.log('save firing')
      await board.save()    
    } catch (err) {
      console.log('save error firing')
      console.log(err)
      return next(err)
    }

    await User.findByIdAndUpdate(ownerRecord._id, { $push: { boardsOwned: board._id } })
    res.status(HttpStatusCode.RECORD_CREATED).json({boardId: board._id})
  }
})

//@desc Get a single Board
// record
//@route GET /api/game/:id
//@access public
const getBoard = asyncHandler( async (req: Request, res: Response) => {
  const game = await Board
.findById(req.params.id);
  if(game) {
    res.status(HttpStatusCode.SUCCESS).json(game);
  } 
  else {
    res.status(HttpStatusCode.NOT_FOUND);
    throw new Error("Board not found");
  }
});

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

//@desc Get all Board
// records for a User
//@route GET /api/game/create-game
//@access private
const getAllBoardsForUser = asyncHandler( async (req: RequestWithUser, res: Response) => {
  console.log('request in allboards:')
  if (req.user) {
    const allUserOwnedBoards = await Board.find({ ownerId: req.user.id}).exec()
    res.status(HttpStatusCode.SUCCESS).json(allUserOwnedBoards)
  }
})

export { createBoard, getBoard, getAllBoardsForUser }