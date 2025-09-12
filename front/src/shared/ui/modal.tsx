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
  title?: string
  onClose?: () => void
}

/**
 * Модальное окно
 * @namespace Shared.UI.Modal
 */
export const Modal = ({ children, trigger, title = "", onClose = () => {} }: ModalProps) => {
  const overlayClasses = makeClasses("fixed", "inset-0", "bg-background-hard/30")
  const windowClasses = makeClasses(
    "fixed",
    "top-1/2",
    "left-1/2",
    "transform",
    "-translate-x-1/2",
    "-translate-y-1/2",
    // "inset-0",
    "flex",
    "flex-col",
    "items-center",
    "justify-center"
    // "w-full",
    // "h-full"
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
  const closeClasses = makeClasses("text-sm", "text-foreground-soft", "cursor-pointer", "hover:text-primary")

  return (
    <Dialog.Root>
      <Dialog.Trigger>{trigger}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={overlayClasses} />
        <Dialog.Content className={windowClasses}>
          <div className={contentClasses}>
            <div className={headerClasses}>
              {title && <Dialog.Title className={titleClasses}>{title}</Dialog.Title>}
              <Dialog.Close asChild className={closeClasses} onClick={onClose}>
                <Icon name="x" size={18} />
              </Dialog.Close>
            </div>
            <Dialog.Description className={bodyClasses}>{children}</Dialog.Description>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
