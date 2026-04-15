import express from "express"
//import { validateToken } from "../middleware/validateTokenHandler"
import { createUser, login, logout, refresh } from "../controllers/userAuthController";

const userAuthRouter = express.Router();

userAuthRouter.route("/register").post(createUser);
userAuthRouter.route("/login").post(login);
userAuthRouter.route("/refresh").post(refresh);
userAuthRouter.route("/logout").post(logout);

export { userAuthRouter }