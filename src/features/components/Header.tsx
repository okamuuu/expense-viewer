import React from "react"

import { RiMoneyCnyCircleFill } from "react-icons/ri"
import { NotificationPopover } from "@/ui/radix-ui/NotificationPopover"
import { Tab, TabGroup, TabList } from "@tremor/react"

import { NotificationList } from "@/core/components/NotificationList"

const tabClass = "hover:border-b-2 hover:border-gray-300"

export const Header = () => {
  return (
    <header>
      <div className="flex flex-col py-2">
        {/* ロゴとタグ */}
        <div className="container mx-auto py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-xl font-bold">
              <RiMoneyCnyCircleFill size="24" />
              <div>EXPENSE VIEWER</div>
              <div className="text-blue-600 text-xs font-medium pl-1">
                v1.0.7
              </div>
            </div>

            <div className="pt-1">
              {/* <NotificationIcon hasNew={false} /> */}
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
