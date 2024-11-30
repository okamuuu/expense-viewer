import { useRouter } from "next/router"

import { DonutChart, BarList, Divider } from "@tremor/react"
import { Loader } from "@/components/Loader"

import { useSummaryQuery } from "@/hooks/useSummaryQuery"

export const SummaryChartContainer = () => {
  const router = useRouter()
  const category = router.query.category?.toString()

  const { data, isLoading, isError } = useSummaryQuery()

  // DonutChart用のデータ形式に変換
  const donutChatData = (data?.summary || []).map(({ category, amount }) => ({
    name: category,
    value: amount,
  }))

  // BarList用のデータ形式に変換
  const barListData = (data?.summary || []).map((x) => ({
    name: x.category,
    value: x.amount,
    color: category && category !== x.category ? "gray" : "blue",
  }))

  if (isError) return <div>error...</div>

  const handleClickDonutChart = (name: string) => {
    router.push({ query: { category: name } })
  }

  return (
    <>
      <div className="flex flex-col gap-6">
        <h3 className="font-semibold text-gray-900 dark:text-gray-50">
          summary
        </h3>
        <div>
          <DonutChart
            className="h-80"
            data={donutChatData}
            variant="donut"
            valueFormatter={(number: number) =>
              `${Intl.NumberFormat("jp").format(number).toString()} JPY`
            }
            onValueChange={(value) => handleClickDonutChart(value?.name)}
          />
        </div>
        <Divider />
        <div>
          <BarList className="h-80" data={barListData} />
        </div>
      </div>

      {isLoading && <Loader />}
    </>
  )
}
