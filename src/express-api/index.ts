import { boardsApi } from "./boards"
import { eventsApi } from "./events"
import { userAuthApi } from "./userAuth"
import { usersApi } from "./users"
import { validationApi } from "./validation"

export const expressApi = {
  userAuth: userAuthApi,
  users: usersApi,
  boards: boardsApi,
  events: eventsApi,
  validation: validationApi
}