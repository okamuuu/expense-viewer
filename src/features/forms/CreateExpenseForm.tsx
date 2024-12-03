import { format } from "date-fns"

import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { FormContextProvider } from "@/ui/react-hook-form/FormContextProvider"
import {
  ContextTextInput,
  ContextDatePicker,
} from "@/ui/react-hook-form/FormContextFields"

interface ExpenseFormData {
  amount: number
  category: string
  description: string
  date: string
}

// Zodでフォームのバリデーションを定義
const expenseSchema = z.object({
  amount: z.coerce.number().positive("金額は正の数でなければなりません"),
  category: z.string().min(1, "カテゴリは必須です"),
  description: z.string().min(1, "説明は必須です"),
  date: z.string().min(1, "日付は必須です"),
})

const formatDate = (date: Date) => format(date, "yyyy-MM-dd")

export const CreateExpenseForm = ({
  onSubmit,
}: {
  onSubmit: (values: ExpenseFormData) => void
}) => {
  // フォームのセットアップ
  const methods = useForm<ExpenseFormData>({
    resolver: zodResolver(expenseSchema),
    mode: "onChange",
    defaultValues: {
      date: formatDate(new Date()),
    },
  })

  return (
    <FormContextProvider methods={methods} onSubmit={onSubmit}>
      <ContextTextInput label="Amount" name="amount" />
      <ContextTextInput label="Category" name="category" />
      <ContextTextInput label="Description" name="description" />
      <ContextDatePicker label="Date" name="date" />
    </FormContextProvider>
  )
}
