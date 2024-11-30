export interface Expense {
  id: number
  amount: number
  category: string
  description: string
  date: string
}

export interface ExpenseFormData {
  amount: number
  category: string
  description: string
  date: string
}
