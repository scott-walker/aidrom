import type { ReactNode } from "react"
import { useRef, useEffect, useState } from "react"
import * as Dialog from "@radix-ui/react-dialog"
import { makeClasses } from "@lib/style-api"
import { Icon } from "@ui/icon"

/**
 * Пропсы модального окна
 * @namespace Shared.UI.Modal.Props
 */
export type ModalProps = {
  trigger: ReactNode
  open?: boolean
  title?: string
  description?: string
  children?: ReactNode
  onOpenChange?: (open: boolean) => void
  onClose?: () => void
  nearTrigger?: boolean
  className?: string
}

/**
 * Модальное окно
 * @namespace Shared.UI.Modal
 */
export const Modal = ({
  children,
  trigger,
  open,
  title,
  description,
  onOpenChange = () => {},
  onClose = () => {},
  nearTrigger = false,
  className = ""
}: ModalProps) => {
  const triggerRef = useRef<HTMLDivElement>(null)
  const [triggerRect, setTriggerRect] = useState<DOMRect | null>(null)

  useEffect(() => {
    if (!nearTrigger) return

    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect()

      setTriggerRect(rect)
    }
  }, [nearTrigger])

  const overlayClasses = makeClasses(
    "fixed",
    "inset-0",
    "bg-foreground-hard/50",
    "data-[state=open]:animate-in",
    "data-[state=open]:fade-in-0",
    "data-[state=closed]:animate-out",
    "data-[state=closed]:fade-out-0",
    "duration-200"
  )

  const windowClasses = makeClasses(
    "fixed",
    "z-40",
    !nearTrigger && "top-1/2",
    !nearTrigger && "left-1/2",
    !nearTrigger && "transform",
    !nearTrigger && "-translate-x-1/2",
    !nearTrigger && "-translate-y-1/2",
    "flex",
    "flex-col",
    "items-center",
    "justify-center",
    "data-[state=open]:animate-in",
    "data-[state=open]:fade-in-0",
    "data-[state=open]:slide-in-from-top-[20%]",
    "data-[state=closed]:animate-out",
    "data-[state=closed]:fade-out-0",
    "data-[state=closed]:slide-out-to-bottom-[20%]",
    "duration-200",
    "ease-out"
  )

  const contentClasses = makeClasses(
    "flex",
    "flex-col",
    "items-center",
    "justify-center",
    "p-4",
    "min-w-[300px]",
    "w-full",
    "rounded-lg",
    "bg-background-soft",
    className
  )

  const headerClasses = makeClasses(
    "flex",
    "justify-between",
    "items-center",
    "w-full",
    "px-4",
    "py-2",
    !title && "hidden"
  )
  const titleClasses = makeClasses("text-xl", "font-bold")
  const descriptionClasses = makeClasses("text-lg", "text-foreground-soft", "px-4", "py-2")
  const bodyClasses = makeClasses("px-4", "py-2", "w-full", "h-full")
  const closeClasses = makeClasses("text-foreground-soft", "cursor-pointer", "hover:text-primary")

  const contentStyle = () => {
    if (nearTrigger && triggerRect) {
      return {
        top: triggerRect.bottom + 8,
        left: triggerRect.left
      }
    }

    return {}
  }

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <div ref={triggerRef}>
        <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      </div>
      <Dialog.Portal>
        <Dialog.Overlay className={overlayClasses} />
        <Dialog.Content
          className={windowClasses}
          style={contentStyle()}
          aria-describedby={description ? undefined : undefined}
        >
          <div className={contentClasses}>
            <div className={headerClasses}>
              <Dialog.Title className={titleClasses}>{title}</Dialog.Title>
              <Dialog.Close asChild className={closeClasses} onClick={onClose}>
                <Icon name="x" size={22} />
              </Dialog.Close>
            </div>
            {description && <Dialog.Description className={descriptionClasses}>{description}</Dialog.Description>}
            {children && <div className={bodyClasses}>{children}</div>}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
