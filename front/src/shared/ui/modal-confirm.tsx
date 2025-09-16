import { useState, useEffect } from "react"
import { Modal, type ModalProps } from "@ui/modal"
import { Button } from "./button"

/**
 * Пропсы модального окна
 * @namespace Shared.UI.Modal.Props
 */
export type ModalConfirmProps = ModalProps & {
  description: string
  nearTrigger?: boolean
  onApprove: () => void
  onReject?: () => void
}

/**
 * Модальное окно
 * @namespace Shared.UI.Modal
 */
export const ModalConfirm = ({ onApprove, onReject, nearTrigger = true, ...props }: ModalConfirmProps) => {
  const [open, setOpen] = useState(false)

  useEffect(() => setOpen(props.open ?? false), [props.open])

  const handleApprove = () => {
    onApprove()
    setOpen(false)
  }
  const handleReject = () => {
    onReject?.()
    setOpen(false)
  }

  return (
    <Modal {...props} open={open} onOpenChange={setOpen} nearTrigger={nearTrigger} className="p-4">
      <div className="flex justify-end gap-2 pt-3">
        <Button onClick={handleReject} schema="hard">
          Отмена
        </Button>
        <Button onClick={handleApprove} schema="primary">
          OK
        </Button>
      </div>
    </Modal>
  )
}
