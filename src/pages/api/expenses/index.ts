import { NextApiRequest, NextApiResponse } from "next"
import { getExpenses, addExpense } from "@/lib/expenses"

const LIMIT = 10

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const { method, query, body } = req
  const { category, page = 1 } = query

  switch (method) {
    case "GET":
      // GETリクエスト（支出一覧取得）
      const expenses = getExpenses(
        Number(page),
        Number(LIMIT),
        category?.toString(),
      )
      const totalItems = 12 // mockデータのアイテム数
      const totalPages = Math.ceil(totalItems / Number(LIMIT))
      const response = {
        expenses,
        pager: {
          currentPage: Number(page),
          totalPages,
          totalItems,
          itemsPerPage: Number(LIMIT),
          hasNextPage: Number(page) < totalPages,
          hasPreviousPage: Number(page) > 1,
        },
      }
      res.status(200).json(response)
      break

    case "POST":
      // POSTリクエスト（支出追加）
      if (!body.amount || !body.category || !body.description || !body.date) {
        return res.status(400).json({ error: "すべてのフィールドが必要です" })
      }
      const newExpense = addExpense(body)
      res.status(201).json(newExpense)
      break

    default:
      res.status(405).json({ error: "Method Not Allowed" })
      break
  }
}

export default handler
