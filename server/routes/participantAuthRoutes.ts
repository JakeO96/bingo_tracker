import express from "express"
import { getJoinEventPageData, joinEvent, refreshParticipant } from "../controllers/participantAuthController"
import { optionalValidateUserToken } from "../middleware/optionalValidateUserTokenHandler"
import { optionalValidateParticipantToken } from "../middleware/optionalValidateParticipantTokenHandler"

const participantAuthRouter = express.Router()

participantAuthRouter.post("/join-event", optionalValidateUserToken, optionalValidateParticipantToken, joinEvent)
participantAuthRouter.route("/refresh-participant").post(refreshParticipant)
participantAuthRouter.route("/join-event-data/:joinToken").get(getJoinEventPageData)

export { participantAuthRouter }