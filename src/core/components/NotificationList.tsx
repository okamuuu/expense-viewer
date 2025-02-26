import { format } from "date-fns"

const formatDate = (date: Date) => format(date, "yyyy-MM-dd")

const Dot = () => (
  <span
    aria-hidden="true"
    className="mb-px mr-1.5 inline-flex size-2 shrink-0 rounded-full bg-blue-500 sm:text-sm dark:bg-blue-500"
  />
)

const NotificationListItem = ({
  message,
  date,
}: {
  message: string
  date: Date
}) => (
  <div className="rounded-md px-1 py-1.5 hover:bg-gray-100/90 focus:outline-none cursor-pointer">
    <p className="text-sm text-gray-900">
      <Dot />
      {message}
    </p>
    <p className="mt-2.5 text-xs text-gray-500">{formatDate(date)}</p>
  </div>
)

export const NotificationList = () => {
  const list = [
    {
      message:
        "We've updated the navigation to make it easier to find the things you use most.",
      date: new Date("2024/10/17"),
    },
    {
      message:
        "We've updated the navigation to make it easier to find the things you use most.",
      date: new Date("2024/11/17"),
    },
    {
      message:
        "We've updated the navigation to make it easier to find the things you use most.",
      date: new Date("2024/12/17"),
    },
  ]
  return (
    <div>
      <div className="flex items-center justify-between gap-6">
        <h2 className="text-base font-semibold text-gray-900">Notifications</h2>
      </div>
      <div className="divide-y divide-gray-200">
        {list.map((x, index) => (
          <div className="py-2" key={index}>
            <NotificationListItem message={x.message} date={x.date} />
          </div>
        ))}
      </div>
    </div>
  )
}
