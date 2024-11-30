import { ExpenseListContainer } from "@/containers/ExpenseListContainer"
import { SummaryChartContainer } from "@/containers/SummaryChartContainer"
import { CreateExpenseFormContainer } from "@/containers/CreateExpenseFormContainer"

import { Card } from "@tremor/react"

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
            <ExpenseListContainer />
          </Card>
        </div>

        {/* 新規支出作成フォーム */}
        <Card className="mx-auto">
          <h2 className="text-xl mt-8 mb-4">新規支出の追加</h2>
          <CreateExpenseFormContainer />
        </Card>
      </div>
    </>
  )
}

export default ExpensesPage
