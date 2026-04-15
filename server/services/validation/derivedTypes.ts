import { z } from 'zod'
import { validationRules } from './validationRules'
import { ValidationRule } from './types'

type ValidationRules = typeof validationRules

export type ValidationEntity = keyof ValidationRules

export type ValidationField<TEntity extends ValidationEntity> =
  Extract<keyof ValidationRules[TEntity], string>

export type RuleFor<
  TEntity extends ValidationEntity,
  TField extends ValidationField<TEntity>
> = ValidationRules[TEntity][TField] & ValidationRule

type ScopeForRule<TRule> = 
  TRule extends { scope: 'global' }
    ? undefined
    : TRule extends { scope: 'owner' }
      ? { ownerId: string }
      : TRule extends { scope: 'event' }
        ? { eventId: string }
        : Record<string, string> | undefined

export type RequestForRule<
  TEntity extends ValidationEntity,
  TField extends ValidationField<TEntity>
> = {
  entity: TEntity
  field: TField
  value: string
  scope: ScopeForRule<RuleFor<TEntity, TField>>
}

export type CheckAvailabilityRequest = {
  [E in ValidationEntity]: {
    [F in ValidationField<E>]: RequestForRule<E, F>
  }[ValidationField<E>]
}[ValidationEntity]

const buildRequestSchema = <
  TEntity extends ValidationEntity,
  TField extends ValidationField<TEntity>
>(
  entity: TEntity,
  field: TField,
  rule: ValidationRule
) => {
  const base = {
    entity: z.literal(entity),
    field: z.literal(field),
    value: z.string().min(1)
  }

  if (rule.mode === 'custom') {
    return z.object({
      ...base,
      scope: z.record(z.string(), z.string()).optional()
    })
  }

  if (rule.scope === 'global') {
    return z.object({
      ...base,
      scope: z.undefined().optional()
    })
  }

  if (rule.scope === 'owner') {
    return z.object({
      ...base,
      scope: z.object({
        ownderId: z.string().min(1)
      })
    })
  }

  if (rule.scope == 'event') {
    return z.object({
      ...base,
      scope: z.object({
        eventId: z.string().min(1)
      })
    })
  }

  const _exhaustiveCheck: never = rule.scope
  throw new Error(`Unhandled rule scope: ${_exhaustiveCheck}`)
}

const requestSchemas = Object.entries(validationRules).flatMap(
  ([entity, fields]) =>
    Object.entries(fields).map(([field, rule]) => 
      buildRequestSchema(
        entity as ValidationEntity,
        field as never,
        rule as never
      )
    )
)

export const checkAvailabilitySchema = z.union(
  requestSchemas as [
    (typeof requestSchemas)[number],
    ...(typeof requestSchemas)[number][]
  ]
)

export type ParsedCheckAvailabilityRequest = CheckAvailabilityRequest