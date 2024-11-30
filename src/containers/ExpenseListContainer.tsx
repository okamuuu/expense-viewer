import { useState } from "react"
import { useRouter } from "next/router"

import { useExpensesQuery } from "@/hooks/useExpensesQuery"
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

  const [page, setPage] = useState(1)

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
  if (isError) return <div>エラー: {(error as Error).message}</div>

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

      {/* ページネーション */}
      <div className="flex justify-between mt-12">
        <Button
          aria-label="Previous page"
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={!pager.hasPreviousPage}
        >
          前へ
        </Button>

        <span>
          ページ {pager.currentPage} / {pager.totalPages}
        </span>

        <Button
          aria-label="Next page"
          onClick={() =>
            setPage((prev) => Math.min(prev + 1, pager.totalPages))
          }
          disabled={!pager.hasNextPage}
        >
          次へ
        </Button>
      </div>
      {isPlaceholderData && <Loader />}
    </>
  )
}
