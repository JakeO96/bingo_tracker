export interface CreateUserRequest {
  username: string;
  password: string;
  email: string;
}

export interface CreateUserResponse {
  username: string;
  email: string;
}

export interface LogInRequest {
  email: string;
  password: string;
}

export interface LogInResponse {
  username: string,
}

export interface LogOutResponse {
  message: string;
}