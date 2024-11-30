import { useRouter } from "next/router"

import { useExpensesQuery } from "@/features/hooks/useExpensesQuery"
import { Loader } from "@/components/Loader"

import {
  Button,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  TableHeaderCell,
} from "@tremor/react"

export const ExpenseListContainer = () => {
  const router = useRouter()
  const category = router.query.category?.toString()
  const page = Number(router.query.page?.toString()) || 1

  const { data, isLoading, isPlaceholderData, isError, error } =
    useExpensesQuery({ page, category })

  const { expenses, pager } = data ?? {
    expenses: [],
    pager: {
      currentPage: 1,
      totalPages: 1,
      hasPreviousPage: false,
      hasNextPage: false,
    },
  }

  if (isLoading) return <Loader />
  if (isError) return <div>Error: {(error as Error).message}</div>

  const handleClickPrev = () => {
    const prev = Math.max(page - 1, 1)
    if (prev > 0) {
      router.push({ query: { page: prev } })
    }
  }

  const handleClickNext = () => {
    const next = Math.min(page + 1, pager.totalPages)
    if (next > 1) {
      router.push({ query: { page: next } })
    }
  }

  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell>Date</TableHeaderCell>
            <TableHeaderCell>Category</TableHeaderCell>
            <TableHeaderCell>Description</TableHeaderCell>
            <TableHeaderCell>Amount</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {expenses?.map((x) => (
            <TableRow key={x.id}>
              <TableCell>{x.date}</TableCell>
              <TableCell>{x.category}</TableCell>
              <TableCell>{x.description}</TableCell>
              <TableCell>{x.amount} JPY</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination */}
      <div className="flex justify-between mt-12">
        <Button
          aria-label="Previous page"
          onClick={handleClickPrev}
          disabled={!pager.hasPreviousPage}
        >
          Previous
        </Button>

        <span>
          ページ {pager.currentPage} / {pager.totalPages}
        </span>

        <Button
          aria-label="Next page"
          onClick={handleClickNext}
          disabled={!pager.hasNextPage}
        >
          Next
        </Button>
      </div>
      {isPlaceholderData && <Loader />}
    </>
  )
}
