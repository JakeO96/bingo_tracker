import express from "express"
import { createBoard, getAllBoardsForUser, getAllBoardSummariesForUser, getBoard, updateBoard } from "../controllers/boardController"
import { validateUserToken } from "../middleware/validateUserTokenHandler";

const boardRouter = express.Router()

boardRouter.use(validateUserToken);
boardRouter.route("/create-board").post(createBoard)
boardRouter.route("/getAllBoardsForUser").get(getAllBoardsForUser)
boardRouter.route("/getAllBoardSummariesForUser").get(getAllBoardSummariesForUser)
boardRouter.route("/:id")
  .get(getBoard)
  .patch(updateBoard)
//.delete(deleteBoard)

export { boardRouter }