import express from "express"
import { createBoard, getAllBoardsForUser, getBoard } from "../controllers/boardController"
import { validateToken } from "../middleware/validateTokenHandler";

const boardRouter = express.Router()

boardRouter.use(validateToken);
boardRouter.route("/create-board").post(createBoard)
boardRouter.route("/getAllBoardsForUser").get(getAllBoardsForUser)
boardRouter.route("/:id").get(getBoard)
//boardRouter.route("/:id").delete(deleteBoard);

export { boardRouter }