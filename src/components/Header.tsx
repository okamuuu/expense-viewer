import React from "react"

import { RiNotificationLine } from "react-icons/ri"
import { RiMoneyCnyCircleFill } from "react-icons/ri"

import { Tab, TabGroup, TabList } from "@tremor/react"

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
                v0.0.1
              </div>
            </div>
            <div>
              <button
                className="relative inline-flex items-center justify-center whitespace-nowrap border text-center text-sm font-medium transition-all duration-100 ease-in-out disabled:pointer-events-none disabled:shadow-none shadow-none border-transparent text-gray-900 dark:text-gray-50 bg-transparent disabled:text-gray-400 disabled:dark:text-gray-600 outline outline-offset-2 outline-0 focus-visible:outline-2 outline-blue-500 dark:outline-blue-500 group rounded-full p-1 hover:bg-gray-100 data-[state=open]:bg-gray-100 hover:dark:bg-gray-400/10 data-[state=open]:dark:bg-gray-400/10"
                tremor-id="tremor-raw"
                aria-label="open notifications"
                type="button"
                aria-haspopup="dialog"
                aria-expanded="false"
                aria-controls="radix-:r0:"
                data-state="closed"
              >
                <span className="flex size-8 items-center justify-center rounded-full border border-gray-300 bg-white p-1 dark:border-gray-700 dark:bg-gray-900 hover:dark:bg-gray-400/10">
                  <RiNotificationLine className="w-4 text-gray-900" />
                  <span
                    className="absolute right-2.5 top-2.5 size-2 shrink-0 rounded-full bg-blue-500"
                    aria-hidden="true"
                  />
                </span>
              </button>
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
