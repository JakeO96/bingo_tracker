import React, { forwardRef, useEffect, useState } from 'react'

/* ==========================================
  ShardTypes
=============================================*/

export type FieldError = string | undefined

export type PlainFormFieldOnChange = (args: {
  name: string
  value: string
}) => void

export type ValidatedFormFieldOnChange = (args: {
  name: string
  value: string
  error: FieldError
}) => void

export type ClientFieldValidator = (value: string) => FieldError

export type ServerValidationResponse = {
  available?: boolean
  exists?: boolean
}

export type ServerFieldValidator = (args: {
  fieldName: string
  value: string
}) => Promise<ServerValidationResponse>

/* ==========================================
  Base visual field
  - Extends normal input props
  - Adds error + wrapper styling
=============================================*/

type BaseFormFieldProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'className'
> & {
  error?: FieldError
  containerClassName?: string
  inputClassName?: string
}

export const formInputStyles = "h-11 p-1 bg-white border border-gray-400 w-full focus:outline-none focus:border-gray-700 focus:ring-1 focus:ring-gray-300"

const BaseFormField = forwardRef<HTMLInputElement, BaseFormFieldProps>(
  (
    {
      error,
      containerClassName = 'w-full',
      inputClassName,
      required,
      ...inputProps
    },
    ref
  ) => {
    return (
      <div className={containerClassName}>
        <span className='text-red-300'>{error}</span>

        <div className='flex'>
          <input
            ref={ref}
            {...inputProps}
            className={`${formInputStyles} ${inputClassName ?? ''}`}
          />

          {required ? (
            <span className='text-red-400 text-2xl pl-1'>*</span>
          ) : (
            <div className='ml-2 pl-1' />
          )}
        </div>
      </div>
    )
  }
)

BaseFormField.displayName = 'BaseFormField'

/* ==========================================
  Shared Hook
=============================================*/

type UseFormFieldArgs = {
  propsValue: string
  name: string
  onChange:
    | PlainFormFieldOnChange
    | ValidatedFormFieldOnChange
  validate?: ClientFieldValidator
  serverValidator?: ServerFieldValidator
}

const getAvailabilityError = (
  fieldName: string,
  response: ServerValidationResponse
): FieldError => {
  if (typeof response.exists === 'boolean') {
    return response.exists ? `${fieldName} already in use` : undefined
  }

  if (typeof response.available === 'boolean') {
    return response.available ? undefined : `${fieldName} already in use`
  }

  return undefined
}

const useFormField = ({
  propsValue,
  name,
  onChange,
  validate,
  serverValidator
}: UseFormFieldArgs) => {
  const [value, setValue] = useState<string>(propsValue)
  const [error, setError] = useState<FieldError>(undefined)

  useEffect(() => {
    setValue(propsValue)
  }, [propsValue])

  const emitPlainChange = (nextValue: string) => {
    ;(onChange as PlainFormFieldOnChange)({
      name,
      value: nextValue
    })
  }

  const emitValidatedChange = (nextValue: string, nextError: FieldError) => {
    ;(onChange as ValidatedFormFieldOnChange)({
      name,
      value: nextValue,
      error: nextError
    })
  }

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (evt) => {
    const nextValue = evt.target.value
    setValue(nextValue)

    if (!validate && !serverValidator) {
      emitPlainChange(nextValue)
      return
    }

    const nextError = validate ? validate(nextValue) : undefined
    setError(nextError)
    emitValidatedChange(nextValue, nextError)
  }

  const handleBlur: React.FocusEventHandler<HTMLInputElement> = async (evt) => {
    if (!serverValidator) return

    const nextValue = evt.target.value
    const nextName = evt.target.name

    if (!nextValue) return

    const clientError = validate ? validate(nextValue) : undefined

    if (clientError) {
      setError(clientError)
      emitValidatedChange(nextValue, clientError)
      return
    }

    const serverResponse = await serverValidator({
      fieldName: nextName,
      value: nextValue
    })

    const nextError = getAvailabilityError(nextName, serverResponse)

    setValue(nextValue)
    setError(nextError)
    emitValidatedChange(nextValue, nextError)
  }

  return {
    value,
    error,
    handleChange,
    handleBlur
  }
}

/* ==========================================
  Plain Field
=============================================*/

type PlainFormFieldProps = Omit<
  BaseFormFieldProps,
  'error' | 'onChange' | 'value'
> & {
  name: string
  value: string
  onChange: PlainFormFieldOnChange
}

const PlainFormField = forwardRef<HTMLInputElement, PlainFormFieldProps>(
  (
    {
      name,
      value: propsValue,
      onChange,
      onFocus,
      placeholder,
      ...inputProps
    },
    ref
  ) => {
    const { value, handleChange } = useFormField({
      propsValue,
      name,
      onChange
    })

    const handleFocus: React.FocusEventHandler<HTMLInputElement> = (evt) => {
      evt.target.placeholder = ''
      onFocus?.(evt)
    }

    return (
      <BaseFormField
        ref={ref}
        {...inputProps}
        name={name}
        value={value}
        placeholder={placeholder ?? ''}
        onChange={handleChange}
        onFocus={handleFocus}
      />
    )
  }
)

PlainFormField.displayName = 'PlainFormField'

/* ==========================================
  Client-validated field
=============================================*/

type ValidatedFormFieldProps = Omit<
  BaseFormFieldProps,
  'error' | 'onChange' | 'value'
> & {
  name: string
  value: string
  validate: ClientFieldValidator
  onChange: ValidatedFormFieldOnChange
}

const ValidatedFormField = forwardRef<HTMLInputElement, ValidatedFormFieldProps>(
  (
    {
      name,
      value: propsValue,
      validate,
      onChange,
      onFocus,
      placeholder,
      ...inputProps
    },
    ref
  ) => {
    const { value, error, handleChange } = useFormField({
      propsValue,
      name,
      validate,
      onChange
    })

    const handleFocus: React.FocusEventHandler<HTMLInputElement> = (evt) => {
      evt.target.placeholder = ''
      onFocus?.(evt)
    }

    return (
      <BaseFormField
        ref={ref}
        {...inputProps}
        error={error}
        name={name}
        value={value}
        placeholder={placeholder ?? ''}
        onChange={handleChange}
        onFocus={handleFocus}
      />
    )
  }
)

ValidatedFormField.displayName = 'ValidatedFormField'

/* ==========================================
  Client-validated field
=============================================*/

type ServerValidatedFormFieldProps = Omit<
  BaseFormFieldProps,
  'error' | 'onChange' | 'value'
> & {
  name: string
  value: string
  onChange: ValidatedFormFieldOnChange
  validate?: ClientFieldValidator
  serverValidator: ServerFieldValidator
}

const ServerValidatedFormField = forwardRef<
  HTMLInputElement,
  ServerValidatedFormFieldProps
>(
  (
    {
      name,
      value: propsValue,
      validate,
      onChange,
      serverValidator,
      onFocus,
      onBlur,
      placeholder,
      ...inputProps
    },
    ref
  ) => {
    const { value, error, handleChange, handleBlur } = useFormField({
      propsValue,
      name,
      validate,
      onChange,
      serverValidator
    })

    const handleFocus: React.FocusEventHandler<HTMLInputElement> = (evt) => {
      evt.target.placeholder = ''
      onFocus?.(evt)
    }

    const mergedBlur: React.FocusEventHandler<HTMLInputElement> = async (evt) => {
      handleBlur(evt)
      onBlur?.(evt)
    }

    return (
      <BaseFormField
        ref={ref}
        {...inputProps}
        error={error}
        name={name}
        value={value}
        placeholder={placeholder ?? ''}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={mergedBlur}
      />
    )
  }
)

ServerValidatedFormField.displayName = 'ServerValidatedFormField'

export {
  BaseFormField,
  PlainFormField,
  ValidatedFormField,
  ServerValidatedFormField
}