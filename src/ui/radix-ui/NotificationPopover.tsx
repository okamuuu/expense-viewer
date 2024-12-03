import * as Popover from "@radix-ui/react-popover"
import type { ReactNode } from "react"

import { RiNotificationLine } from "react-icons/ri"

export const NotificationIcon = ({ hasNew }: { hasNew: boolean }) => (
  <button className="relative inline-flex outline outline-offset-2 outline-0 outline-blue-500 rounded-full p-1 hover:bg-gray-100">
    <span className="rounded-full border border-gray-300 bg-white p-2">
      <RiNotificationLine className="w-4 text-gray-900" />
    </span>
    {hasNew && (
      <span
        className="absolute size-2 rounded-full bg-blue-500"
        style={{ top: "12px", right: "12px" }}
      />
    )}
  </button>
)

export const NotificationPopover = ({ children }: { children: ReactNode }) => (
  <Popover.Root>
    <Popover.Trigger>
      <NotificationIcon hasNew={true} />
    </Popover.Trigger>
    <Popover.Content>{children}</Popover.Content>
  </Popover.Root>
)
