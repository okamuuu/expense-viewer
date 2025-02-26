import { useClickOutside } from "@/core/hooks/useClickOutside"

import { Card } from "@tremor/react"
import { Modal } from "@/core/components/Modal"

import type { ReactElement } from "react"

export const ModalCard = ({
  children,
  onClickOutside,
}: {
  children: ReactElement
  onClickOutside: () => void
}) => {
  const outsideRef = useClickOutside(onClickOutside)

  return (
    <Modal>
      <div className="w-3/4 max-w-xl" ref={outsideRef}>
        <Card>{children}</Card>
      </div>
    </Modal>
  )
}
