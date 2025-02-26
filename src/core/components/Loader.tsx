import { Modal } from "@/core/components/Modal"
import { DotLoader } from "react-spinners"

export const Loader = () => (
  <Modal>
    <DotLoader color="#222222" size={60} speedMultiplier={3} />
  </Modal>
)
