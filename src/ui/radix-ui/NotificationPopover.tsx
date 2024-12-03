import { Popover } from "@radix-ui/themes"

import { RiNotificationLine } from "react-icons/ri"

import type { ReactNode } from "react"

export const NotificationIcon = ({ hasNew }: { hasNew: boolean }) => (
  <span className="relative inline-flex outline outline-offset-2 outline-0 outline-blue-500 rounded-full p-1 hover:bg-gray-100">
    <span className="rounded-full border border-gray-300 bg-white p-2">
      <RiNotificationLine className="w-4 text-gray-900" />
    </span>
    {hasNew && (
      <span className="absolute top-3 right-3 size-2 rounded-full bg-blue-500" />
    )}
  </span>
)

export const NotificationPopover = ({ children }: { children: ReactNode }) => (
  <Popover.Root>
    <Popover.Trigger>
      <button>
        <NotificationIcon hasNew={true} />
      </button>
    </Popover.Trigger>
    <Popover.Content>{children}</Popover.Content>
  </Popover.Root>
)
