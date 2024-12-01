import { useState } from "react"
import { CreateExpenseForm } from "@/features/forms/CreateExpenseForm"
import { Loader } from "@/components/Loader"
import { ModalCard } from "@/components/ModalCard"
import { useCreateExpenseMutation } from "@/features/hooks/useCreateExpenseMutation"

import { Button } from "@tremor/react"
import { useRouter } from "next/router"

import type { ExpenseFormData } from "@/features/types"
import toast from "react-hot-toast"

export const CreateExpenseFormContainer = () => {
  const [showModal, setShowModal] = useState(false)
  const router = useRouter()

  const { isPending, mutateAsync } = useCreateExpenseMutation()

  const onSubmit = async (values: ExpenseFormData) => {
    await mutateAsync(values)
    setShowModal(false)
    router.push({ query: { page: 1 } })
    toast.success("create expense success")
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
