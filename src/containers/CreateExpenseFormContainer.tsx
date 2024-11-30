import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { useQueryClient, useMutation } from "@tanstack/react-query"
import { Loader } from "@/components/Loader"
import { CreateExpenseForm } from "@/forms/CreateExpenseForm"

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

import axios from "axios"
import toast from "react-hot-toast"

const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

const createExpense = async (expense: ExpenseFormData) => {
  try {
    const response = await axios.post("/api/expenses", expense, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    await sleep(500)
    toast.success("success")
    return response.data
  } catch (error) {
    // Axiosのエラーハンドリング
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Failed to create expense",
      )
    } else {
      throw new Error("An unexpected error occurred")
    }
  }
}

export const CreateExpenseFormContainer = () => {
  const queryClient = useQueryClient()

  // 支出を作成するミューテーション
  const { isPending, mutateAsync } = useMutation({
    mutationFn: createExpense,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] })
      queryClient.invalidateQueries({ queryKey: ["summary"] })
    },
    onError: (error: unknown) => {
      toast.error((error as Error).message)
      console.error("Error creating expense:", (error as Error).message)
    },
  })

  const onSubmit = async (data: ExpenseFormData) => {
    mutateAsync(data)
    // query params を初期状態に戻す
  }

  return (
    <>
      <CreateExpenseForm onSubmit={onSubmit} />
      {isPending && <Loader />}
    </>
  )
}