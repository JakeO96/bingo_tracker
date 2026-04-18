import express from "express"
import { getJoinEventPageData, joinEvent, refreshParticipant } from "../controllers/participantAuthController"

const participantAuthRouter = express.Router()

participantAuthRouter.route("/join-event").post(joinEvent)
participantAuthRouter.route("/refresh-participant").post(refreshParticipant)
participantAuthRouter.route("/join-event-data/:joinToken").get(getJoinEventPageData)

export { participantAuthRouter }