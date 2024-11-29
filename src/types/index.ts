export interface Expense {
  id: number
  amount: number
  category: string
  description: string
  date: string
}

export interface Pager {
  currentPage: number
  totalPages: number
  totalItems: number
  itemsPerPage: number
  hasNextPage: boolean
  hasPreviousPage: boolean
}
