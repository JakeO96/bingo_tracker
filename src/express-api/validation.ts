import type { CheckAvailabilityRequest, CheckAvailabilityResponse } from "../../shared/types/express-api/validation"
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
    "Failed to check availability of record",
    {
      entity,
      field,
      value,
      scope
    }
  )

export const validationApi = {
  checkAvailability
}

