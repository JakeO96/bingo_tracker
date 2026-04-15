import express from "express";
import { checkAvailability } from "../controllers/validationController";

const validationRouter = express.Router()

validationRouter.route('/availability').post(checkAvailability)

export { validationRouter }