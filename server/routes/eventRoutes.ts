import express from 'express'
import { createEvent, getAllEventSummariesForUser } from '../controllers/eventController'
import { validateToken } from '../middleware/validateTokenHandler'

const eventRouter = express.Router()

eventRouter.use(validateToken)
eventRouter.route('/create-event').post(createEvent)
eventRouter.route('/getAllEventSummariesForUser').get(getAllEventSummariesForUser)

export { eventRouter }