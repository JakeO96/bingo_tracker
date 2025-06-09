import express from "express"
import { createBoard, getAllBoards, getBoard } from "../controllers/boardController";
//import { validateToken } from "../middleware/validateTokenHandler";

const boardRouter = express.Router();

//boardRouter.use(validateToken);
boardRouter.route("/create-board").post(createBoard);
boardRouter.route("/get-all-boards").get(getAllBoards);
boardRouter.route("/:id").get(getBoard);
//boardRouter.route("/:id").delete(deleteBoard);

export { boardRouter };