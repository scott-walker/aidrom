import type { ReactNode } from "react"
import * as Dialog from "@radix-ui/react-dialog"
import { makeClasses } from "@lib/style-api"
import { Icon } from "@ui/icon"

/**
 * Пропсы модального окна
 * @namespace Shared.UI.Modal.Props
 */
type ModalProps = {
  children: ReactNode
  trigger: ReactNode
  open?: boolean | undefined
  title?: string
  onOpenChange?: (open: boolean) => void
  onClose?: () => void
}

/**
 * Модальное окно
 * @namespace Shared.UI.Modal
 */
export const Modal = ({
  children,
  trigger,
  open,
  title = "",
  onOpenChange = () => {},
  onClose = () => {}
}: ModalProps) => {
  const overlayClasses = makeClasses("fixed", "inset-0", "bg-background-hard/30")
  const windowClasses = makeClasses(
    "fixed",
    "top-1/2",
    "left-1/2",
    "transform",
    "-translate-x-1/2",
    "-translate-y-1/2",
    "flex",
    "flex-col",
    "items-center",
    "justify-center"
  )
  const contentClasses = makeClasses(
    "flex",
    "flex-col",
    "items-center",
    "justify-center",
    "min-w-[300px]",
    "rounded-lg",
    "shadow-xl",
    "bg-background-soft"
  )
  const headerClasses = makeClasses(
    "flex",
    "justify-between",
    "items-center",
    "w-full",
    "px-4",
    "py-2",
    "border-b",
    "border-background-hard"
  )
  const titleClasses = makeClasses("text-lg", "font-bold")
  const bodyClasses = makeClasses("px-4", "py-2", "w-full", "h-full")
  const closeClasses = makeClasses("text-foreground-soft", "cursor-pointer", "hover:text-primary")

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={overlayClasses} />
        <div className={windowClasses}>
          <div className={contentClasses}>
            <div className={headerClasses}>
              {title && <div className={titleClasses}>{title}</div>}
              <Dialog.Close asChild className={closeClasses} onClick={onClose}>
                <Icon name="x" size={18} />
              </Dialog.Close>
            </div>
            <div className={bodyClasses}>{children}</div>
          </div>
        </div>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
