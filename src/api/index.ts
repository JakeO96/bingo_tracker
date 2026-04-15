import { userAuthApi } from "./userAuth"
import { usersApi } from "./users"
import { validationApi } from "./validation"

export const api = {
  userAuth: userAuthApi,
  users: usersApi,
  validation: validationApi
}