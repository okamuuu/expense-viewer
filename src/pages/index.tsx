import { ExpenseListContainer } from "@/containers/ExpenseListContainer"
import { SummaryChartContainer } from "@/containers/SummaryChartContainer"
import { CreateExpenseFormContainer } from "@/containers/CreateExpenseFormContainer"

import { Card } from "@tremor/react"
import { Modal } from "@/components/Modal"

const ExpensesPage = () => {
  return (
    <>
      <div className="container mx-auto flex flex-col gap-6">
        <h1 className="text-2xl font-semibold mb-4">Expenses</h1>
        <div className="flex gap-6">
          {/* summary */}
          <Card className="mx-auto w-1/3">
            <SummaryChartContainer />
          </Card>

          {/* 支出一覧 */}
          <Card className="mx-auto w-2/3">
            <div className="flex flex-col gap-6">
              <CreateExpenseFormContainer />
              <ExpenseListContainer />
            </div>
          </Card>
        </div>
      </div>
    </>
  )
}

export default ExpensesPage
