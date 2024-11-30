import {
  getExpenseById,
  updateExpense,
  deleteExpense,
} from "@/features/utils/expenses"
import type { NextApiRequest, NextApiResponse } from "next"

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req
  const { id } = req.query // URLパラメータから `id` を取得

  // `id` がなければ 400 エラーを返す
  if (!id || Array.isArray(id)) {
    return res.status(400).json({ error: "Invalid or missing ID" })
  }

  // `id` を数値に変換
  const expenseId = parseInt(id as string, 10)

  switch (method) {
    case "GET":
      // GETリクエスト（指定したIDの支出詳細を取得）
      const expense = getExpenseById(expenseId)
      if (!expense) {
        return res
          .status(404)
          .json({ error: `Expense with ID ${expenseId} not found` })
      }
      res.status(200).json(expense)
      break

    case "PUT":
      // PUTリクエスト（指定したIDの支出を更新）
      const { amount, category, description, date } = req.body

      if (!amount || !category || !description || !date) {
        return res.status(400).json({
          error:
            "All fields (amount, category, description, date) are required",
        })
      }

      const updatedExpense = updateExpense(expenseId, {
        amount,
        category,
        description,
        date,
      })
      if (!updatedExpense) {
        return res
          .status(404)
          .json({ error: `Expense with ID ${expenseId} not found` })
      }

      res.status(200).json(updatedExpense)
      break

    case "DELETE":
      // DELETEリクエスト（指定したIDの支出を削除）
      const deletedExpense = deleteExpense(expenseId)
      if (!deletedExpense) {
        return res
          .status(404)
          .json({ error: `Expense with ID ${expenseId} not found` })
      }

      res.status(200).json({ message: `Expense with ID ${expenseId} deleted` })
      break

    default:
      res.status(405).json({ error: "Method Not Allowed" })
      break
  }
}

export default handler
