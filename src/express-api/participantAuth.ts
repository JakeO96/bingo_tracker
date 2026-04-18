import { makeApiCall } from "./client"
import type { GetJoinEventPageDataResponse, JoinEventRequest, JoinEventResponse } from '../../shared/types/express-api/participantAuth'

const joinEvent = async (joinEventData: JoinEventRequest): Promise<JoinEventResponse> =>
  makeApiCall<JoinEventResponse>(
    'POST',
    '/auth/participant/join-event',
    'Failed to join event',
    joinEventData
  )

  const getJoinEventPageData = async ( joinToken: string): Promise<GetJoinEventPageDataResponse> =>
  makeApiCall<GetJoinEventPageDataResponse>(
    'GET',
    `/auth/participant/join-event-data/${joinToken}`,
    'Failed to get Join Event data'
  )

  export const participantAuthApi = {
    joinEvent,
    getJoinEventPageData
  }