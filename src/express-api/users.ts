import { makeApiCall } from "./client"
import type { GetLoggedInUsersResponse } from "../../shared/types/express-api/users"

// Get a single user
/*const getUser = async (): Promise<GetUserResponse> =>
  makeApiCall<GetUserResponse>(
    'GET', 
    '/user',
    {},
    "Failed to get user"
  )*/

// Get all users currently logged in
const getLoggedInUsers = async (): Promise<GetLoggedInUsersResponse> => 
  makeApiCall<GetLoggedInUsersResponse>(
    'GET', 
    '/user/logged-in',
    "Failed to get all users currently logged in"
  )


export const usersApi = {
  getLoggedInUsers,
}

