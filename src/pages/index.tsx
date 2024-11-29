import { useState } from "react"
import axios from "axios"
import toast from "react-hot-toast"
import { format } from "date-fns"
import { DotLoader } from "react-spinners"

import {
  useQueryClient,
  useQuery,
  useMutation,
  keepPreviousData,
} from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Button,
  Card,
  DonutChart,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  TableHeaderCell,
} from "@tremor/react"

import type { AxiosResponse } from "axios"
import type { ReactNode } from "react"
import type { Pager, Expense } from "@/types"

interface ExpenseFormData {
  amount: number
  category: string
  description: string
  date: string
}

const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

const fetchExpenses = async ({
  page,
  limit,
}: {
  page: number
  limit: number
}) => {
  try {
    const response: AxiosResponse<{ expenses: Expense[]; pager: Pager }> =
      await axios.get("/api/expenses", {
        params: { page, limit }, // クエリパラメータを渡す
      })
    await sleep(1500)
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.message || "Failed to fetch expenses"
      toast.error(errorMessage)
      throw new Error(
        error.response?.data?.message || "Failed to fetch expenses",
      )
    } else {
      const unknownErrorMessage = "An unexpected error occurred"
      toast.error(unknownErrorMessage)
      throw new Error(unknownErrorMessage)
    }
  }
}

const fetchSummary = async () => {
  try {
    const response: AxiosResponse<{ summary: { [key: string]: number } }> =
      await axios.get("/api/expenses/summary")
    await sleep(1500)
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.message || "Failed to fetch expenses"
      toast.error(errorMessage)
      throw new Error(
        error.response?.data?.message || "Failed to fetch expenses",
      )
    } else {
      const unknownErrorMessage = "An unexpected error occurred"
      toast.error(unknownErrorMessage)
      throw new Error(unknownErrorMessage)
    }
  }
}

const createExpense = async (expense: ExpenseFormData) => {
  try {
    const response = await axios.post("/api/expenses", expense, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    await sleep(3000)
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

// Zodでフォームのバリデーションを定義
const expenseSchema = z.object({
  amount: z.coerce.number().positive("金額は正の数でなければなりません"),
  category: z.string().min(1, "カテゴリは必須です"),
  description: z.string().min(1, "説明は必須です"),
  date: z.string().min(1, "日付は必須です"),
})

const formatDate = (date: Date) => format(date, "yyyy-MM-dd")

const Modal = ({ children }: { children: ReactNode }) => (
  <div className="relative z-50">
    <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"></div>
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div className="flex min-h-full items-center justify-center text-center">
        {children}
      </div>
    </div>
  </div>
)

const Loader = () => (
  <Modal>
    <DotLoader color="#222222" size={60} speedMultiplier={3} />
  </Modal>
)

const ChartContainer = () => {
  // 支出データとページネーションを取得
  const { data, isLoading, isError } = useQuery<{
    summary: {
      [key: string]: number
    }
  }>({
    queryKey: ["summary"],
    queryFn: () => fetchSummary(),
    placeholderData: keepPreviousData,
  })

  // PieChart用のデータ形式に変換
  const chartCategoryData = Object.entries(data?.summary || {}).map(
    ([category, amount]) => ({
      name: category,
      value: amount,
    }),
  )

  if (isError) return <div>error...</div>

  return (
    <>
      <div className="p-8">
        <DonutChart
          className="h-80"
          data={chartCategoryData}
          variant="donut"
          valueFormatter={(number: number) =>
            `${Intl.NumberFormat("jp").format(number).toString()} JPY`
          }
          onValueChange={(v) => console.log(v)}
        />
      </div>
      {isLoading && <Loader />}
    </>
  )
}

const ExpensesPage = () => {
  const [page, setPage] = useState(1)
  const limit = 10

  const queryClient = useQueryClient()
  // 支出データとページネーションを取得
  const { data, isLoading, isPlaceholderData, isError, error } = useQuery<{
    expenses: Expense[]
    pager: Pager
  }>({
    queryKey: ["expenses", { page, limit }],
    queryFn: () => fetchExpenses({ page, limit }),
    placeholderData: keepPreviousData,
  })

  const todayDate = formatDate(new Date())

  // フォームのセットアップ
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ExpenseFormData>({
    resolver: zodResolver(expenseSchema),
    mode: "onChange",
    defaultValues: {
      date: todayDate,
    },
  })

  // 支出を作成するミューテーション
  const { isPending, mutate } = useMutation({
    mutationFn: createExpense,
    onSuccess: () => {
      reset() // フォームのリセット
      setPage(1) // 最初のページに戻す
      queryClient.invalidateQueries({ queryKey: ["expenses"] })
      queryClient.invalidateQueries({ queryKey: ["summary"] })
    },
    onError: (error: unknown) => {
      toast.error((error as Error).message)
      console.error("Error creating expense:", (error as Error).message)
    },
  })

  const onSubmit = (data: ExpenseFormData) => {
    mutate(data)
  }

  const { expenses, pager } = data ?? {
    expenses: [],
    pager: {
      currentPage: 1,
      totalPages: 1,
      hasPreviousPage: false,
      hasNextPage: false,
    },
  }

  if (isLoading) return <Loader />
  if (isError) return <div>エラー: {(error as Error).message}</div>

  return (
    <>
      <div className="container mx-auto flex flex-col gap-6">
        <h1 className="text-2xl font-semibold mb-4">Expenses</h1>
        <div className="flex gap-6">
          {/* summary */}
          <Card className="mx-auto w-1/3">
            <ChartContainer />
          </Card>

          {/* 支出一覧 */}
          <Card className="mx-auto w-2/3">
            <Table>
              <TableHead>
                <TableRow>
                  <TableHeaderCell>Date</TableHeaderCell>
                  <TableHeaderCell>Category</TableHeaderCell>
                  <TableHeaderCell>Description</TableHeaderCell>
                  <TableHeaderCell>Amount</TableHeaderCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {expenses?.map((x) => (
                  <TableRow key={x.id}>
                    <TableCell>{x.date}</TableCell>
                    <TableCell>{x.category}</TableCell>
                    <TableCell>{x.description}</TableCell>
                    <TableCell>{x.amount} JPY</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {/* ページネーション */}
            <div className="flex justify-between mt-12">
              <Button
                aria-label="Previous page"
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                disabled={!pager.hasPreviousPage}
              >
                前へ
              </Button>

              <span>
                ページ {pager.currentPage} / {pager.totalPages}
              </span>

              <Button
                aria-label="Next page"
                onClick={() =>
                  setPage((prev) => Math.min(prev + 1, pager.totalPages))
                }
                disabled={!pager.hasNextPage}
              >
                次へ
              </Button>
            </div>
          </Card>
        </div>

        {/* 新規支出作成フォーム */}
        <Card className="mx-auto">
          <h2 className="text-xl mt-8 mb-4">新規支出の追加</h2>
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
                <span className="text-red-500">
                  {errors.description.message}
                </span>
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

            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded"
              disabled={isPending}
            >
              {isPending ? "送信中..." : "支出を追加"}
            </button>
          </form>
        </Card>
      </div>
      {(isPlaceholderData || isPending) && <Loader />}
    </>
  )
}

export default ExpensesPage
