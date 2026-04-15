import type { CheckAvailabilityRequest } from "../../shared/types/api/validation"
import type { RecordCheckResponse } from "../FormFields"
import { makeApiCall } from "./client"

const checkAvailability = async ({
  entity, 
  field, 
  value, 
  scope = undefined
}: CheckAvailabilityRequest): Promise<RecordCheckResponse> => 
  makeApiCall<RecordCheckResponse>(
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

