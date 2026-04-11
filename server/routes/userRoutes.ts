import express from "express";
import { 
  getAllUsers, 
  fieldExists, 
  updateUser, 
  deleteUser, 
  currentUser, 
  getLoggedInUsers,
} from "../controllers/userController";
import { validateUserToken } from "../middleware/validateUserTokenHandler";

const userRouter = express.Router();
userRouter.route("/").get(validateUserToken, getAllUsers);
userRouter.get("/current-user", validateUserToken, currentUser);  
userRouter.get("/logged-in", validateUserToken, getLoggedInUsers)
userRouter.route("/exists/:fieldName/:value").get(fieldExists);
//userRouter.route("/:id").get(getUser);
userRouter.route("/:id").put(validateUserToken, updateUser);
userRouter.route("/:id").delete(validateUserToken, deleteUser);

export { userRouter }