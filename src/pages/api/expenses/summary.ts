// pages/api/expenses/summary.ts
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
  {
    id: 3,
    amount: 3000,
    category: "エンタメ",
    description: "映画",
    date: "2024-11-27",
  },
]

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { start_date, end_date } = req.query

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

  const summary = filteredExpenses.reduce(
    (acc: { [key: string]: number }, exp) => {
      if (!acc[exp.category]) {
        acc[exp.category] = 0
      }
      acc[exp.category] += exp.amount
      return acc
    },
    {},
  )

  res.status(200).json({ summary })
}
