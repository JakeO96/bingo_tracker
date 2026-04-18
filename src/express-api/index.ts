import { boardsApi } from "./boards"
import { eventsApi } from "./events"
import { participantAuthApi } from "./participantAuth"
import { userAuthApi } from "./userAuth"
import { usersApi } from "./users"
import { validationApi } from "./validation"

export const expressApi = {
  userAuth: userAuthApi,
  participantAuth: participantAuthApi,
  users: usersApi,
  boards: boardsApi,
  events: eventsApi,
  validation: validationApi

}