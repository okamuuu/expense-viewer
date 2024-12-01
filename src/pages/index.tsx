import { ExpenseListContainer } from "@/features/containers/ExpenseListContainer"
import { SummaryChartContainer } from "@/features/containers/SummaryChartContainer"
import { CreateExpenseFormContainer } from "@/features/containers/CreateExpenseFormContainer"

import { Card } from "@tremor/react"

import Header from "@/components/Header"

const ExpensesPage = () => {
  return (
    <div className="flex flex-col gap-6">
      <Header />

      {/* hero */}
      <div className="container mx-auto flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-50">
            Expenses
          </h1>
          <p className="text-gray-500 sm:text-sm/6 dark:text-gray-500">
            Monitor daily expenditures
          </p>
        </div>
      </div>

      <div className="container mx-auto flex flex-col gap-6">
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
    </div>
  )
}

export default ExpensesPage
