import type { RecordCheckResponse } from "./FormFields";
const SERVER_API_URL= 'http://localhost:3002/api'

const fetchMethods = {
  'POST': 'POST',
  'GET': 'GET',
  'PUT': 'PUT',
  'DELETE': 'DELETE',
}

class ExpressAPI {

  // Create a User
  createUser = async (data: object): Promise<Response> => {
    const response = await this.makeApiCall(fetchMethods.POST, '/auth/register', data)
    return response;
  }

  // Log a user in
  logUserIn = async (data: object): Promise<Response> => {
    const response = await this.makeApiCall(fetchMethods.POST, '/auth/login', data)
    return response;
  }

  // Log a user out
  logUserOut = async (): Promise<Response> => {
    const response = await this.makeApiCall(fetchMethods.POST, '/auth/logout');
    return response;
  }

  // Get a single user
  getUser = async (): Promise<unknown> => {
    const response = await this.makeApiCall(fetchMethods.GET, '/user');
    return response;
  }

  // Get all users currently logged in
  getLoggedInUsers = async (): Promise<Response> => {
    const response = await this.makeApiCall(fetchMethods.GET, '/user/logged-in');
    return response;
  }

  // Check to see if a form fields, value already a value in an existing User document in the DB. 
  fieldExistsInDB = async (fieldName: string, value: string): Promise<RecordCheckResponse> => {
    const response: Response = await this.makeApiCall(fetchMethods.GET,`/user/exists/${fieldName}/${value}`);
    if (response.ok) {
      const data: RecordCheckResponse = await response.json()
      return data
    } else {
      // Handle error appropriately
      throw new Error('Server returned an error response')
    }
  }
  

  // Create a new Bingo Board
  createBoard = async (data: object ): Promise<Response> => {
    const response = await this.makeApiCall(fetchMethods.POST, '/board/create-board', data)
    return response
  }

  getAllBoardsForUser = async (): Promise<Response> => {
    const response = await this.makeApiCall(fetchMethods.GET, '/board/getAllBoardsForUser')
    return response
  }

  // Fetch wrapper
  private makeApiCall = async (method: string, endpoint: string, data: unknown = {}): Promise<Response> => {
    const url = `${SERVER_API_URL}${endpoint}`
    
    const headers: Headers = new Headers();
    headers.append('Content-Type', 'application/json')

    const requestOptions: RequestInit = {
      method,
      headers,
      credentials: 'include', // Include http-only cookies
    };
    if (method === 'POST') {
      requestOptions.body = JSON.stringify(data)
    }
    
    const response = await fetch(url, requestOptions)
    if(response.status === 401) {
      const errorData = await response.json();
      if(errorData.message === 'Session has expired. Please log in again.') {
        const refreshResponse = await fetch(`${SERVER_API_URL}/auth/refresh`, { method: 'POST', credentials: 'include' });
        if (!refreshResponse.ok) {
          throw new Error('Unable to refresh tokens');
        }
        const retryResponse = await fetch(url, requestOptions);
        return retryResponse;
      }
    }
    return response
  } 
}

export default new ExpressAPI()