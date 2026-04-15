import type { CreateUserRequest, CreateUserResponse, LogInRequest, LogInResponse, LogOutResponse } from "../../shared/types/api/userAuth"
import { makeApiCall } from "./client"

const createUser = (data: CreateUserRequest): Promise<CreateUserResponse> => 
    makeApiCall<CreateUserResponse>(
      'POST', 
      '/auth/user/register', 
      data,
      "Failed to create user"
    )

  // Log a user in
  const logUserIn = (data: LogInRequest): Promise<LogInResponse> =>
    makeApiCall<LogInResponse>(
      'POST',
      '/auth/user/login', 
      data,
      "Failed to log user in"       
    )

  // Log a user out
  const logUserOut = (): Promise<LogOutResponse> => 
    makeApiCall<LogOutResponse>(
      'POST', 
      '/auth/user/logout',
      {},
      "Failed to log user out"
    )

  export const userAuthApi = {
    createUser,
    logUserIn,
    logUserOut
  }