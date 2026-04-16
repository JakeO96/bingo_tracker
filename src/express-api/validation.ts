import type { CheckAvailabilityRequest, CheckAvailabilityResponse } from "../../shared/types/api/validation"
import { makeApiCall } from "./client"

const checkAvailability = async ({
  entity, 
  field, 
  value, 
  scope = undefined
}: CheckAvailabilityRequest): Promise<CheckAvailabilityResponse> => 
  makeApiCall<CheckAvailabilityResponse>(
    'POST',
    '/validate/availability',
    {
      entity,
      field,
      value,
      scope
    },
    "Failed to check availability of record"
  )

export const validationApi = {
  checkAvailability
}

