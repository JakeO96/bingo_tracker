import { validationRules } from "./validationRules";
import type { 
  ValidationEntity, 
  ValidationField, 
  ParsedCheckAvailabilityRequest,
  CheckAvailabilityRequest,
  RuleFor
} from './derivedTypes'
import { ValidationRule } from "./types";

type RuleFromRequest<TRequest extends CheckAvailabilityRequest> =
  TRequest extends {
    entity: infer TEntity
    field: infer TField
  }
    ? TEntity extends ValidationEntity
      ? TField extends ValidationField<TEntity>
        ? RuleFor<TEntity, TField>
        : never
      : never
    : never

const getValidationRule = <TRequest extends CheckAvailabilityRequest>(
  request: TRequest
): RuleFromRequest<TRequest> => {
  return (
    validationRules[request.entity] as Record<string, ValidationRule>
  )[request.field] as RuleFromRequest<TRequest>
}

export const checkAvailabilityService = async (
  request: ParsedCheckAvailabilityRequest
) => {
  const rule = getValidationRule(request)

  const normalizedValue = rule.normalize
    ? rule.normalize(request.value)
    : request.value

  /**
  if (rule.mode === 'custom') {
    return await rule.check({
      value: normalizedValue,
      scope: request.scope
    })
  }
  */

  const query: Record<string, unknown> = {
    [rule.dbField ?? request.field]: normalizedValue
  }

  if (rule.scope === 'owner') {
    const scope = request.scope as { ownerId: string} | undefined

    if (!scope?.ownerId) {
      throw new Error('ownerId is requred')
    }

    query[rule.scopeFieldMap?.owner ?? 'ownerId'] = scope.ownerId
  }

  if (rule.scope === 'event') {
    const scope = request.scope as { eventId: string } | undefined

    if (!scope?.eventId) {
      throw new Error('eventId is required')
    }
    
    query[rule.scopeFieldMap?.event ?? 'eventId'] = scope.eventId
  }

  const exists = await rule.model.exists(query)

  return {
    available: !exists
  }
};