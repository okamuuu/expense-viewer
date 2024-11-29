// pages/api/expenses/index.ts
import { NextApiRequest, NextApiResponse } from "next"
import { Expense } from "../../../types/expense"

const expenses: Expense[] = [
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
  if (req.method === "GET") {
    // 支出の一覧取得
    const { start_date, end_date, category, limit = 10 } = req.query

    let filteredExpenses = expenses

    if (start_date) {
      filteredExpenses = filteredExpenses.filter(
        (exp) => new Date(exp.date) >= new Date(start_date as string),
      )
    }

    if (end_date) {
      filteredExpenses = filteredExpenses.filter(
        (exp) => new Date(exp.date) <= new Date(end_date as string),
      )
    }

    if (category) {
      filteredExpenses = filteredExpenses.filter(
        (exp) => exp.category === category,
      )
    }

    return res
      .status(200)
      .json({ expenses: filteredExpenses.slice(0, Number(limit)) })
  } else if (req.method === "POST") {
    // 支出の追加
    const { amount, category, description, date }: Expense = req.body

    if (!amount || !category) {
      return res.status(400).json({ message: "amount と category は必須です" })
    }

    const newExpense: Expense = {
      id: expenses.length + 1,
      amount,
      category,
      description: description || "",
      date: date || new Date().toISOString().split("T")[0], // デフォルトで今日の日付
    }

    expenses.push(newExpense)

    return res.status(201).json(newExpense)
  } else {
    return res.status(405).json({ message: "Method Not Allowed" })
  }
}
