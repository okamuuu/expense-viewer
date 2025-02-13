import React from "react"

import { RiMoneyCnyCircleFill } from "react-icons/ri"
import {
  NotificationPopover,
  NotificationIcon,
} from "@/ui/radix-ui/NotificationPopover"
import { Tab, TabGroup, TabList } from "@tremor/react"

import { NotificationList } from "@/components/NotificationList"

const tabClass = "hover:border-b-2 hover:border-gray-300"

export const Header = () => {
  return (
    <header>
      <div className="flex flex-col">
        {/* ロゴとタグ */}
        <div className="container mx-auto px-2 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 text-xl font-bold text-gray-800">
                <RiMoneyCnyCircleFill size="24" />
                EXPENSE VIEWER
              </div>
              <div className="text-blue-600 text-xs font-medium pt-1">
                v1.0.3
              </div>
            </div>
            <div>
              <NotificationIcon hasNew={false} />
              <NotificationPopover>
                <NotificationList />
              </NotificationPopover>
            </div>
          </div>
        </div>
        {/* ナビゲーション */}
        <div className="w-full">
          <TabGroup defaultIndex={0}>
            <TabList variant="line">
              <div className="container mx-auto flex">
                <Tab value="1" className={tabClass}>
                  Expenses
                </Tab>
                {/* <Tab value="2" className={tabClass}>
                  xxx xxx xxx
                </Tab>
                <Tab value="3" className={tabClass}>
                  zzz zzz zzz
                </Tab> */}
              </div>
            </TabList>
          </TabGroup>
        </div>
      </div>
    </header>
  )
}
