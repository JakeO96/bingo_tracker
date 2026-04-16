export interface CheckAvailabilityRequest {
  entity: string;
  field: string;
  value: string;
  scope?: Record<string, string>;
}

export interface CheckAvailabilityResponse {
  available: boolean
}