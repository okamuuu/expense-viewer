import { FormProvider } from "react-hook-form"

import { Button, Divider } from "@tremor/react"

import type { ReactNode } from "react"
import type { FieldValues, SubmitHandler, UseFormReturn } from "react-hook-form"

const ResetButton = ({ onReset }: { onReset: () => void }) => (
  <Button type="reset" variant="secondary" onClick={onReset}>
    reset
  </Button>
)

export const FormContextProvider = <T extends FieldValues>({
  children,
  methods,
  onSubmit,
  onReset,
}: {
  children: ReactNode
  methods: UseFormReturn<T>
  onSubmit: SubmitHandler<T>
  onReset?: () => void
}) => {
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-6">
          {children}
          {onReset && <ResetButton onReset={onReset} />}
          <Button type="submit">送信</Button>
        </div>
      </form>
    </FormProvider>
  )
}
