import { useState } from "react"
import { useQueryClient, useMutation } from "@tanstack/react-query"
import { CreateExpenseForm } from "@/forms/CreateExpenseForm"
import { Loader } from "@/components/Loader"
import { ModalCard } from "@/components/ModalCard"

interface ExpenseFormData {
  amount: number
  category: string
  description: string
  date: string
}

import axios from "axios"
import toast from "react-hot-toast"
import { Button } from "@tremor/react"
import { useRouter } from "next/router"

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
  const [showModal, setShowModal] = useState(false)
  const router = useRouter()
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
    setShowModal(false)
    router.push({ query: { page: 1 } })
    // query params を初期状態に戻す
  }

  return (
    <>
      <div className="text-right">
        <Button onClick={() => setShowModal(true)}>create</Button>
      </div>
      {showModal && (
        <ModalCard onClickOutside={() => setShowModal(false)}>
          <CreateExpenseForm onSubmit={onSubmit} />
        </ModalCard>
      )}
      {isPending && <Loader />}
    </>
  )
}
