import type { RecordCheckResponse } from "./FormFields"
import type { LoginResponse } from '../shared/types/api.ts'
import type { BoardData } from "../shared/types/bingo.ts"
import type { EventData } from "../shared/types/events.ts"

const SERVER_API_URL= 'http://localhost:3002/api'
const fetchMethods = {
  'POST': 'POST',
  'GET': 'GET',
  'PUT': 'PUT',
  'DELETE': 'DELETE',
  'PATCH': 'PATCH'
}

class ExpressAPI {

  // Create a User
  createUser = async (data: object): Promise<Response> => {
    const responseJSON = await this.makeApiCall(
      fetchMethods.POST, 
      '/auth/register', 
      data,
      "Failed to create user"
    )
    return responseJSON
  }

  // Log a user in
  logUserIn = async (data: object): Promise<LoginResponse> => {
    const responseJSON = await this.makeApiCall(
      fetchMethods.POST,
      '/auth/login', 
      data,
      "Failed to log user in"       
    )
    return responseJSON as LoginResponse
  }

  // Log a user out
  logUserOut = async (): Promise<Response> => {
    const responseJSON = await this.makeApiCall(
      fetchMethods.POST, 
      '/auth/logout',
      {},
      "Failed to log user out"
    )
    return responseJSON
  }

  // Get a single user
  getUser = async (): Promise<unknown> => {
    const responseJSON = await this.makeApiCall(
      fetchMethods.GET, 
      '/user',
      {},
      "Failed to get user"
    )
    return responseJSON
  }

  // Get all users currently logged in
  getLoggedInUsers = async (): Promise<Response> => {
    const responseJSON = await this.makeApiCall(
      fetchMethods.GET, 
      '/user/logged-in',
      {},
      "Failed to get all users currently logged in"
    )
    return responseJSON
  }

  // Check to see if a form fields, value already a value in an existing User document in the DB. 
  fieldExistsInDB = async (fieldName: string, value: string): Promise<RecordCheckResponse> => {
    const responseJSON = await this.makeApiCall(
      fetchMethods.GET,
      `/user/exists/${fieldName}/${value}`,
      {},
      "Server returned an error response"
    )
    return responseJSON as RecordCheckResponse
  }
  

  // Create a new Bingo Board
  createBoard = async (data: object ): Promise<Response> => {
    console.log(`IN EXPRESS API CALL CREATEBOARD-------- ${JSON.stringify(data)}`)
    const responseJSON = await this.makeApiCall(
      fetchMethods.POST, 
      '/board/create-board', 
      data,
      "Failed to create board"    
    )

    return responseJSON
  }

  getAllBoardsForUser = async (): Promise<Response> => {
    const responseJSON = await this.makeApiCall(
      fetchMethods.GET, 
      '/board/getAllBoardsForUser',
      {},
      "Failed to get user boards"  
    )

    return responseJSON
  }

  getAllBoardSummariesForUser = async (): Promise<unknown> => {
    const responseJSON = await this.makeApiCall(
      fetchMethods.GET,
      '/board/getAllBoardSummariesForUser',
      {},
      "Failed to get user board summaries"
    )

    return responseJSON
  }

  getBoard = async (id: string): Promise<unknown> => {
    const responseJSON = await this.makeApiCall(
      fetchMethods.GET,
      `/board/${id}`,
      {},
      "Failed to get board"
    )

    return responseJSON
  }

  updateBoard = async (id: string, updateData: BoardData) => {
    const responseJSON = await this.makeApiCall(
      fetchMethods.PATCH,
      `/board/${id}`,
      { updateData },
      "Failed to update board"
    )

    return responseJSON

  }

  createEvent = async (draftEvent: EventData): Promise<Response> => {
    const responseJSON = await this.makeApiCall(
      fetchMethods.POST,
      '/event/create-event',
      { draftEvent },
      "Failed to create board"
    )

    return responseJSON
  }

    getAllEventSummariesForUser = async (): Promise<unknown> => {
    const responseJSON = await this.makeApiCall(
      fetchMethods.GET,
      '/event/getAllEventSummariesForUser',
      {},
      "Failed to get user board summaries"
    )

    return responseJSON
  }

  // Fetch wrapper
  private makeApiCall = async (method: string, endpoint: string, data: unknown, errorMessage: string): Promise<Response> => {
    const url = `${SERVER_API_URL}${endpoint}`
    
    const headers: Headers = new Headers();
    headers.append('Content-Type', 'application/json')

    const requestOptions: RequestInit = {
      method,
      headers,
      credentials: 'include', // Include http-only cookies
    };
    if (method !== 'GET') {
      requestOptions.body = JSON.stringify(data)
    }
    
    let response = await fetch(url, requestOptions)
    if(response.status === 401) {
      const errorData = await response.json();
      if(errorData.message === 'Session has expired. Please log in again.') {
        const refreshResponse = await fetch(
          `${SERVER_API_URL}/auth/refresh`, 
          { 
            method: 'POST', 
            credentials: 'include' 
          }
        );
        if (!refreshResponse.ok) {
          throw new Error('Unable to refresh tokens');
        }
        response = await fetch(url, requestOptions);
      }
    }

    if (!response.ok) {
      throw new Error(errorMessage)
    }

    return await response.json()
  } 
}

export default new ExpressAPI()