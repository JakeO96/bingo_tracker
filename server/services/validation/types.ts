/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Model } from 'mongoose'

type ValidationScopeType = 'global' | 'owner' | 'event'

type UniqueRule = {
  model: Model<any>;
  mode: 'unique';
  scope: ValidationScopeType;
  normalize?: (value: string) => string;
  dbField?: string;
  scopeFieldMap?: Partial<Record<'owner' | 'event', string>>;
}

type CustomRule = {
  mode: 'custom';
  normalize?: (value: string) => string;
  check: (args: {
    value: string;
    scope?: Record<string, string>;
  }) => Promise<{ available: boolean }>
}

export type ValidationRule = UniqueRule | CustomRule