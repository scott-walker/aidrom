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
      success: "bg-green-500",
      error: "bg-danger/10 text-danger",
      warning: "bg-yellow-500",
      info: "bg-blue-500"
    }
  })

  return <div className={getVariant(type)}>{children}</div>
}
