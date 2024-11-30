import axios from "axios"
import toast from "react-hot-toast"
import { useQuery, keepPreviousData } from "@tanstack/react-query"
import { Expense } from "@/features/types"
import { sleep } from "@/utils/sleep"

import type { Pager } from "@/types"
import type { AxiosResponse } from "axios"

const fetchExpenses = async ({
  page,
  category,
}: {
  page: number
  category?: string
}) => {
  try {
    const response: AxiosResponse<{ expenses: Expense[]; pager: Pager }> =
      await axios.get("/api/expenses", {
        params: { page, category },
      })
    await sleep(500)
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.message || "Failed to fetch expenses"
      toast.error(errorMessage)
      throw new Error(errorMessage)
    } else {
      const unknownErrorMessage = "An unexpected error occurred"
      toast.error(unknownErrorMessage)
      throw new Error(unknownErrorMessage)
    }
  }
}

export const useExpensesQuery = ({
  page,
  category,
}: {
  page: number
  category?: string
}) => {
  // 支出データとページネーションを取得
  return useQuery<{
    expenses: Expense[]
    pager: Pager
  }>({
    queryKey: ["expenses", { page, category }],
    queryFn: () => fetchExpenses({ page, category }),
    placeholderData: keepPreviousData,
  })
}