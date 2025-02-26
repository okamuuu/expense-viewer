import axios from "axios"
import { useQuery, keepPreviousData } from "@tanstack/react-query"
import { sleep } from "@/core/utils/sleep"

import type { AxiosResponse } from "axios"

const fetchSummary = async () => {
  try {
    const response: AxiosResponse<{
      summary: { category: string; amount: number }[]
    }> = await axios.get("/api/expenses/summary")
    await sleep(500)
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch expenses",
      )
    } else {
      throw new Error("An unexpected error occurred")
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
