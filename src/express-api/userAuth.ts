import type { CreateUserRequest, CreateUserResponse, LogInRequest, LogInResponse} from "../../shared/types/express-api/userAuth"
import { makeApiCall } from "./client"

const createUser = (data: CreateUserRequest): Promise<CreateUserResponse> => 
    makeApiCall<CreateUserResponse>(
      'POST', 
      '/auth/user/register', 
      "Failed to create user",
      data
    )

  // Log a user in
  const logUserIn = (data: LogInRequest): Promise<LogInResponse> =>
    makeApiCall<LogInResponse>(
      'POST',
      '/auth/user/login', 
      "Failed to log user in",
      data       
    )

  // Log a user out
  const logUserOut = (): Promise<void> => 
    makeApiCall<void>(
      'POST', 
      '/auth/user/logout',
      "Failed to log user out"
    )

  export const tryTokenRefresh = async (apiUrl: string) =>
    fetch(
        `${apiUrl}/auth/user/refresh`, 
        { 
          method: 'POST', 
          credentials: 'include' 
        }
      )

  export const userAuthApi = {
    createUser,
    logUserIn,
    logUserOut
  }