import express from 'express'
import { createEvent, getAllEventSummariesForUser, getEvent, getEventSingleTeamData } from '../controllers/eventController'
import { validateUserToken } from '../middleware/validateUserTokenHandler'

const eventRouter = express.Router()

eventRouter.use(validateUserToken)
eventRouter.route('/create-event').post(createEvent)
eventRouter.route('/getAllEventSummariesForUser').get(getAllEventSummariesForUser)
eventRouter.route('/:id').get(getEvent)
eventRouter.route('/:eventId/team/:teamId').get(getEventSingleTeamData)

export { eventRouter }