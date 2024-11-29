// pages/api/expenses/[id].ts
import { NextApiRequest, NextApiResponse } from "next"
import { Expense } from "../../../types/expense"

let expenses: Expense[] = [
  {
    id: 1,
    amount: 1200,
    category: "食費",
    description: "ランチ",
    date: "2024-11-29",
  },
  {
    id: 2,
    amount: 1500,
    category: "交通費",
    description: "電車",
    date: "2024-11-28",
  },
]

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query
  const expense = expenses.find((exp) => exp.id === parseInt(id as string))

  if (!expense) {
    return res.status(404).json({ message: "支出が見つかりません" })
  }

  if (req.method === "GET") {
    return res.status(200).json(expense)
  }

  if (req.method === "PUT") {
    // 支出の更新
    const { amount, category, description, date }: Expense = req.body

    expense.amount = amount || expense.amount
    expense.category = category || expense.category
    expense.description = description || expense.description
    expense.date = date || expense.date

    return res.status(200).json(expense)
  }

  if (req.method === "DELETE") {
    // 支出の削除
    expenses = expenses.filter((exp) => exp.id !== parseInt(id as string))

    return res.status(200).json({ message: "支出が削除されました" })
  }

  return res.status(405).json({ message: "Method Not Allowed" })
}
