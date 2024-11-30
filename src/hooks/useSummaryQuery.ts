import axios from "axios"
import toast from "react-hot-toast"
import { useQuery, keepPreviousData } from "@tanstack/react-query"

import type { AxiosResponse } from "axios"

const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

const fetchSummary = async () => {
  try {
    const response: AxiosResponse<{
      summary: { category: string; amount: number }[]
    }> = await axios.get("/api/expenses/summary")
    await sleep(500)
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

export const useSummaryQuery = () => {
  return useQuery<{
    summary: { category: string; amount: number }[]
  }>({
    queryKey: ["summary"],
    queryFn: () => fetchSummary(),
    placeholderData: keepPreviousData,
  })
}
