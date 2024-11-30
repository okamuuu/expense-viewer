import { format } from "date-fns"

import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@tremor/react"

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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ExpenseFormData>({
    resolver: zodResolver(expenseSchema),
    mode: "onChange",
    defaultValues: {
      date: formatDate(new Date()),
    },
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="amount" className="block">
          金額
        </label>
        <input
          {...register("amount")}
          id="amount"
          type="text"
          className="w-full px-4 py-2 border border-gray-300 rounded"
        />
        {errors.amount && (
          <span className="text-red-500">{errors.amount.message}</span>
        )}
      </div>

      <div>
        <label htmlFor="category" className="block">
          カテゴリ
        </label>
        <input
          {...register("category")}
          id="category"
          className="w-full px-4 py-2 border border-gray-300 rounded"
        />
        {errors.category && (
          <span className="text-red-500">{errors.category.message}</span>
        )}
      </div>

      <div>
        <label htmlFor="description" className="block">
          説明
        </label>
        <input
          {...register("description")}
          id="description"
          className="w-full px-4 py-2 border border-gray-300 rounded"
        />
        {errors.description && (
          <span className="text-red-500">{errors.description.message}</span>
        )}
      </div>

      <div>
        <label htmlFor="date" className="block">
          日付
        </label>
        <input
          {...register("date")}
          id="date"
          type="date"
          className="w-full px-4 py-2 border border-gray-300 rounded"
        />
        {errors.date && (
          <span className="text-red-500">{errors.date.message}</span>
        )}
      </div>

      <Button type="submit">送信</Button>
    </form>
  )
}
