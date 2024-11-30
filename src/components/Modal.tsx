import type { ReactNode } from "react"

export const Modal = ({ children }: { children: ReactNode }) => (
  <div className="relative z-50">
    <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"></div>
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div className="flex min-h-full items-center justify-center text-center">
        {children}
      </div>
    </div>
  </div>
)
