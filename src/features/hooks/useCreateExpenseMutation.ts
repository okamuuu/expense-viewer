import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Expense, ExpenseFormData } from "@/features/types"
import { sleep } from "@/core/utils/sleep"

const createExpense = async (expense: ExpenseFormData): Promise<Expense> => {
  const response = await fetch("/api/expenses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(expense),
  })
  if (!response.ok) {
    throw new Error("failed to create Expense")
  }
  await sleep(1000)
  return response.json()
}

export const useCreateExpenseMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createExpense,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] })
      queryClient.invalidateQueries({ queryKey: ["summary"] })
    },
  })
}
