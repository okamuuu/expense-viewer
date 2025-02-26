import { ExpenseListContainer } from "@/containers/ExpenseListContainer"
import { SummaryChartContainer } from "@/containers/SummaryChartContainer"
import { CreateExpenseFormContainer } from "@/containers/CreateExpenseFormContainer"

import { Card } from "@tremor/react"

import { Header } from "@/features/components/Header"

const ExpensesPage = () => {
  return (
    <div className="flex flex-col gap-6">
      <Header />

      {/* hero */}
      <div className="container mx-auto flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-50">
              Expenses
            </h1>
            <p className="text-gray-500 sm:text-sm/6 dark:text-gray-500">
              Monitor daily expenditures
            </p>
          </div>
          <div>
            <CreateExpenseFormContainer />
          </div>
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
              <ExpenseListContainer />
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default ExpensesPage
