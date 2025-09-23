import type { ReactNode } from "react"
import { makeVariants } from "@lib/style-api"

/**
 * Пропсы уведомления
 * @namespace UI.Notification.Props
 */
type NotificationProps = {
  children: ReactNode
  type?: "success" | "error" | "warning" | "info"
  className?: string
}

/**
 * Уведомление
 * @namespace UI.Notification
 * @returns {ReactNode}
 */
export const Notification = ({ children, type = "info", className = "" }: NotificationProps) => {
  const getVariant = makeVariants({
    beforeClasses: ["flex", "items-center", "gap-2", "rounded-lg", "py-4", "px-8", "text-lg", "font-display"],
    afterClasses: className,
    variants: {
      success: "bg-positive text-positive-foreground",
      error: "bg-danger text-danger-foreground",
      warning: "bg-warning text-warning-foreground",
      info: "bg-background-hard text-foreground-hard"
    }
  })

  return <div className={getVariant(type)}>{children}</div>
}
