import { useState, useEffect } from "react"

import { useFormContext, useController } from "react-hook-form"

import {
  Text,
  TextInput,
  Textarea,
  Select,
  SelectItem,
  DatePicker,
} from "@tremor/react"

const useContextField = (name: string) => {
  // NOTE: useFormContext return undefined if you call it not in FormProvider
  const {
    control,
    formState: { errors },
  } = useFormContext()

  const { field } = useController({ control, name })

  return { field, errors }
}

export const ContextTextInput = ({
  label,
  name,
  placeholder,
}: {
  label: string
  name: string
  placeholder?: string
}) => {
  const { field, errors } = useContextField(name)

  return (
    <div className="flex flex-col gap-3">
      <label htmlFor={name}>
        <Text>{label}</Text>
      </label>

      <TextInput
        id={name}
        aria-label={label}
        onChange={field.onChange}
        value={field.value}
        placeholder={placeholder}
        error={!!errors[name]}
        errorMessage={errors[name]?.message?.toString()}
      />
    </div>
  )
}

export const ContextTextarea = ({
  label,
  name,
  placeholder,
  rows = 6,
}: {
  label: string
  name: string
  placeholder?: string
  rows?: number
}) => {
  const { field, errors } = useContextField(name)

  return (
    <div className="flex flex-col gap-3">
      <label htmlFor={name}>
        <Text>{label}</Text>
      </label>
      <Textarea
        id={name}
        aria-label={label}
        onChange={field.onChange}
        value={field.value}
        placeholder={placeholder}
        rows={rows}
        error={!!errors[name]}
        errorMessage={errors[name]?.message?.toString()}
      />
    </div>
  )
}

type SelectFieldProps = {
  label: string
  name: string
  options: Option[]
}

type Option = {
  label: string
  value: string
  icon?: React.ElementType
}

export const ContextSelect = ({ label, name, options }: SelectFieldProps) => {
  const { field, errors } = useContextField(name)

  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (isClient) {
    return null
  }

  return (
    <div className="flex flex-col gap-3">
      <label htmlFor={name}>
        <Text>{label}</Text>
      </label>
      <Select
        id={name}
        aria-label={label}
        onValueChange={field.onChange}
        value={field.value}
        error={!!errors[name]}
        errorMessage={errors[name]?.message?.toString()}
      >
        {options.map((option, index) => (
          <SelectItem
            key={index}
            aria-label={`${label}-${option.value}`}
            value={option.value}
          >
            {option.label}
          </SelectItem>
        ))}
      </Select>
    </div>
  )
}

export const ContextDatePicker = ({
  label,
  name,
}: {
  label: string
  name: string
}) => {
  const { field, errors } = useContextField(name)

  return (
    <div className="flex flex-col gap-3">
      <label htmlFor={name}>
        <Text>{label}</Text>
      </label>
      <DatePicker value={new Date(field.value)} onChange={field.onChange} />
      {errors[name]?.message?.toString()}
    </div>
  )
}
