import express from "express"
import { joinEvent, refreshParticipant } from "../controllers/participantAuthController"

const participantAuthRouter = express.Router()

participantAuthRouter.route("/join-event").post(joinEvent)
participantAuthRouter.route("/refresh-participant").post(refreshParticipant)

export { participantAuthRouter }