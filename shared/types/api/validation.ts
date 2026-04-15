export type CheckAvailabilityRequest = {
  entity: string;
  field: string;
  value: string;
  scope?: Record<string, string>;
}