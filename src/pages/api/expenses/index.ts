import { NextApiRequest, NextApiResponse } from "next"

type Expense = {
  id: number
  amount: number
  category: string
  description: string
  date: string
}

const mockExpenses: Expense[] = [
  {
    id: 1,
    amount: 5000,
    category: "Food",
    description: "Lunch",
    date: "2024-01-01",
  },
  {
    id: 2,
    amount: 1500,
    category: "Transport",
    description: "Train Ticket",
    date: "2024-01-02",
  },
  {
    id: 3,
    amount: 800,
    category: "Food",
    description: "Snack",
    date: "2024-01-03",
  },
  {
    id: 4,
    amount: 2000,
    category: "Entertainment",
    description: "Movie",
    date: "2024-01-04",
  },
  {
    id: 5,
    amount: 1200,
    category: "Food",
    description: "Coffee",
    date: "2024-01-05",
  },
  {
    id: 6,
    amount: 1000,
    category: "Transport",
    description: "Bus",
    date: "2024-01-06",
  },
  {
    id: 7,
    amount: 4000,
    category: "Food",
    description: "Dinner",
    date: "2024-01-07",
  },
  {
    id: 8,
    amount: 3000,
    category: "Entertainment",
    description: "Concert",
    date: "2024-01-08",
  },
  {
    id: 9,
    amount: 700,
    category: "Food",
    description: "Snack",
    date: "2024-01-09",
  },
  {
    id: 10,
    amount: 500,
    category: "Transport",
    description: "Metro",
    date: "2024-01-10",
  },
  {
    id: 11,
    amount: 1500,
    category: "Food",
    description: "Lunch",
    date: "2024-01-11",
  },
  {
    id: 12,
    amount: 2500,
    category: "Transport",
    description: "Taxi",
    date: "2024-01-12",
  },
  // More items...
]

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const { page = 1, limit = 5 } = req.query

  // ページ番号とリミットを整数に変換
  const currentPage = parseInt(page as string, 10)
  const itemsPerPage = parseInt(limit as string, 10)

  // ページネーションの計算
  const offset = (currentPage - 1) * itemsPerPage
  const pagedExpenses = mockExpenses.slice(offset, offset + itemsPerPage)

  // ページネーション情報の生成
  const totalItems = mockExpenses.length
  const totalPages = Math.ceil(totalItems / itemsPerPage)

  const response = {
    expenses: pagedExpenses,
    pager: {
      currentPage,
      totalPages,
      totalItems,
      itemsPerPage,
      hasNextPage: currentPage < totalPages,
      hasPreviousPage: currentPage > 1,
    },
  }

  res.status(200).json(response)
}

export default handler
