import { tryTokenRefresh } from "./userAuth";


const SERVER_API_URL= 'http://localhost:3002/api'

type FetchMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

//Fetch Wrapper
export async function makeApiCall<TResponse>(
  method: FetchMethod, 
  endpoint: string, 
  errorMessage: string,
  data?: unknown, 
): Promise<TResponse> {
  const url = `${SERVER_API_URL}${endpoint}`
  
  const headers: Headers = new Headers();
  headers.append('Content-Type', 'application/json')

  const requestOptions: RequestInit = {
    method,
    headers,
    credentials: 'include', // Include http-only cookies
  };
  if (method !== 'GET' && data !== undefined) {
    requestOptions.body = JSON.stringify(data)
  }
  
  let response = await fetch(url, requestOptions)
  if(response.status === 401) {
    const errorData = await response.json();
    if(errorData.message === 'Session has expired') {
      const refreshResponse = await tryTokenRefresh(SERVER_API_URL)
      if (!refreshResponse.ok) {
        throw new Error('Unable to refresh tokens');
      }
      response = await fetch(url, requestOptions);
    }
  }

  const responseJSON = await response.json().catch(() => null)

  if (response.status === 204) {
    return undefined as TResponse
  }

  if (!response.ok) {
    throw new Error(responseJSON?.message || errorMessage)
  }

  return responseJSON as TResponse
} 