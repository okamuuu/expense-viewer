import type { Expense } from "@/features/types"

let mockExpenses: Expense[] = [
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
]

export const getAllExpenses = (category?: string) => {
  // ページネーションの計算
  const sortedExpenses = mockExpenses
    .filter((x) => (category ? x.category === category : true))
    .sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime() // 降順
    })
  return sortedExpenses
}

export const getExpenses = (page: number, limit: number, category?: string) => {
  // ページネーションの計算
  const offset = (page - 1) * limit
  const sortedExpenses = mockExpenses
    .filter((x) => (category ? x.category === category : true))
    .sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime() // 降順
    })

  return sortedExpenses.slice(offset, offset + limit)
}

export const getExpenseById = (id: number) => {
  return mockExpenses.find((expense) => expense.id === id)
}

export const addExpense = (expense: Expense) => {
  expense.id = mockExpenses.length + 1
  mockExpenses.push(expense)
  return expense
}

export const updateExpense = (id: number, updatedExpense: Partial<Expense>) => {
  const expenseIndex = mockExpenses.findIndex((expense) => expense.id === id)
  if (expenseIndex === -1) return null
  mockExpenses[expenseIndex] = {
    ...mockExpenses[expenseIndex],
    ...updatedExpense,
  }
  return mockExpenses[expenseIndex]
}

export const deleteExpense = (id: number) => {
  const expenseIndex = mockExpenses.findIndex((expense) => expense.id === id)
  if (expenseIndex === -1) return null
  mockExpenses = [
    ...mockExpenses.slice(0, expenseIndex),
    ...mockExpenses.slice(expenseIndex + 1),
  ]
  return { id }
}
