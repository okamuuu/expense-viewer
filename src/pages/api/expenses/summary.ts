// pages/api/expenses/summary.ts

import { getAllExpenses } from "@/lib/expenses"

import type { NextApiRequest, NextApiResponse } from "next"

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { start_date, end_date } = req.query

  let filteredExpenses = getAllExpenses()

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
