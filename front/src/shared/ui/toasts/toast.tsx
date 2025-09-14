// shared/ui/toast/toast.tsx
import type { ReactNode } from "react"
import { makeVariants } from "@lib/style-api"
import { Icon, type IconName } from "@ui/icon"
import type { ToastType } from "./types"

/**
 * Пропсы для уведомления
 * @namespace Shared.Ui.Toasts.Toast.ToastProps
 */
type ToastProps = {
  type: ToastType
  message: string
  title?: string
  onClose?: () => void
}

/**
 * Уведомление
 * @namespace Shared.Ui.Toasts.Toast.Toast
 */
export const Toast = ({ type, title, message, onClose = () => {} }: ToastProps): ReactNode => {
  const getVariant = makeVariants({
    beforeClasses: [
      "flex",
      "items-center",
      "justify-start",
      "gap-4",
      "px-6",
      "py-3",
      "rounded-lg",
      "shadow-lg",
      "border",
      "max-w-sm",
      "w-full",
      "text-lg",
      "font-display",
      "cursor-pointer",
      "transition-transform",
      "duration-300",
      "hover:scale-110"
    ],
    variants: {
      success: "bg-primary/80 border-primary text-primary-foreground",
      error: "bg-danger/80 border-danger text-danger-foreground",
      warning: "bg-warning/80 border-warning text-warning-foreground",
      info: "bg-foreground-hard/80 border-foreground-hard text-background-soft"
    }
  })
  const iconMap = {
    success: "check-circle",
    error: "x-circle",
    warning: "alert-triangle",
    info: "info"
  }

  return (
    <div className={getVariant(type)} onClick={onClose}>
      <Icon name={iconMap[type] as IconName} size={32} className="mt-0.5 flex-shrink-0" />

      <div className="flex-1 min-w-0">
        {title && <p className="font-semibold text-lg">{title}</p>}

        <p className="text-base">{message}</p>
      </div>
    </div>
  )
}
