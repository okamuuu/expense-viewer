import { useState } from "react"
import {
  useQueryClient,
  useQuery,
  useMutation,
  keepPreviousData,
} from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Card, DonutChart } from "@tremor/react"
import { Pager, Expense } from "@/types"

interface ExpenseFormData {
  amount: number
  category: string
  description: string
  date: string
}

const fetchExpenses = async ({
  page,
  limit,
}: {
  page: number
  limit: number
}) => {
  const res = await fetch(`/api/expenses?page=${page}&limit=${limit}`)
  if (!res.ok) throw new Error("Failed to fetch expenses")
  return res.json()
}

const createExpense = async (expense: ExpenseFormData) => {
  const res = await fetch("/api/expenses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(expense),
  })
  if (!res.ok) throw new Error("Failed to create expense")
  return res.json()
}

// Zodでフォームのバリデーションを定義
const expenseSchema = z.object({
  amount: z.coerce.number().positive("金額は正の数でなければなりません"),
  category: z.string().min(1, "カテゴリは必須です"),
  description: z.string().min(1, "説明は必須です"),
  date: z.string().min(1, "日付は必須です"),
})

const formatDate = (date: Date) => date.toISOString().split("T")[0] // yyyy-mm-dd 形式

const ExpensesPage = () => {
  const [page, setPage] = useState(1)
  const limit = 5

  const queryClient = useQueryClient()
  // 支出データとページネーションを取得
  const { data, isLoading, isError, error } = useQuery({
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
    defaultValues: {
      date: todayDate,
    },
  })

  // 支出を作成するミューテーション
  const mutation = useMutation({
    mutationFn: createExpense,
    onSuccess: () => {
      reset() // フォームのリセット
      setPage(1) // 最初のページに戻す
      queryClient.invalidateQueries({ queryKey: ["expenses"] })
    },
    onError: (error: unknown) => {
      console.error("Error creating expense:", (error as Error).message)
    },
  })

  const onSubmit = (data: ExpenseFormData) => {
    mutation.mutate(data)
  }

  if (isLoading) return <div>読み込み中...</div>
  if (isError) return <div>エラー: {(error as Error).message}</div>

  const { expenses, pager }: { expenses: Expense[]; pager: Pager } = data!

  // カテゴリ別の支出額を集計
  const categoryData = expenses.reduce(
    (acc, expense) => {
      if (!acc[expense.category]) {
        acc[expense.category] = 0
      }
      acc[expense.category] += expense.amount
      return acc
    },
    {} as { [key: string]: number },
  )

  // PieChart用のデータ形式に変換
  const chartCategoryData = Object.entries(categoryData).map(
    ([category, amount]) => ({
      name: category,
      value: amount,
    }),
  )

  return (
    <div className="container mx-auto flex flex-col gap-4">
      <h1 className="text-2xl font-semibold mb-4">支出一覧</h1>

      {/* ダッシュボードカード */}
      <Card className="mx-auto">
        <div className="p-8">
          <h2>支出の推移</h2>

          <DonutChart
            className="h-80"
            data={chartCategoryData}
            variant="donut"
            valueFormatter={(number: number) =>
              `${Intl.NumberFormat("jp").format(number).toString()}円`
            }
            onValueChange={(v) => console.log(v)}
          />
        </div>
      </Card>

      {/* 支出一覧 */}
      <Card className="mx-auto">
        {expenses.length === 0 ? (
          <p>支出がありません。</p>
        ) : (
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left">金額</th>
                <th className="px-4 py-2 text-left">カテゴリ</th>
                <th className="px-4 py-2 text-left">説明</th>
                <th className="px-4 py-2 text-left">日付</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense) => (
                <tr key={expense.id} className="border-t">
                  <td className="px-4 py-2">{expense.amount} 円</td>
                  <td className="px-4 py-2">{expense.category}</td>
                  <td className="px-4 py-2">{expense.description}</td>
                  <td className="px-4 py-2">{expense.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* ページネーション */}
        <div className="flex justify-between mt-4">
          <button
            onClick={() => setPage(page > 1 ? page - 1 : page)}
            className="px-4 py-2 bg-blue-500 text-white rounded"
            disabled={!pager.hasPreviousPage}
          >
            前へ
          </button>

          <span>
            ページ {pager.currentPage} / {pager.totalPages}
          </span>

          <button
            onClick={() => setPage(page < pager.totalPages ? page + 1 : page)}
            className="px-4 py-2 bg-blue-500 text-white rounded"
            disabled={!pager.hasNextPage}
          >
            次へ
          </button>
        </div>
      </Card>

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

          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "送信中..." : "支出を追加"}
          </button>
        </form>
      </Card>
    </div>
  )
}

export default ExpensesPage
