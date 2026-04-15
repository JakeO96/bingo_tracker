  const SERVER_API_URL= 'http://localhost:3002/api'

  type FetchMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

//Fetch Wrapper
export async function makeApiCall<TResponse>(
  method: FetchMethod, 
  endpoint: string, 
  data: unknown, 
  errorMessage: string
): Promise<TResponse> {
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

  const responseJSON = await response.json().catch(() => null)

  if (!response.ok) {
    throw new Error(responseJSON?.message || errorMessage)
  }

  return responseJSON as TResponse
} 