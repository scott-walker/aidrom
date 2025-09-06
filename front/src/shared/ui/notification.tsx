import type { ReactNode } from "react"
import { makeVariants } from "@lib/style-api"

/**
 * Пропсы уведомления
 * @namespace UI.Notification.Props
 */
type NotificationProps = {
  children: ReactNode
  type?: "success" | "error" | "warning" | "info"
}

/**
 * Уведомление
 * @namespace UI.Notification
 * @returns {ReactNode}
 */
export const Notification = ({ children, type = "info" }: NotificationProps) => {
  const getVariant = makeVariants({
    beforeClasses: ["flex", "items-center", "gap-2", "rounded-lg", "py-4", "px-8", "text-lg", "font-display"],
    variants: {
      success: "bg-green-500",
      error: "bg-danger/3 text-danger",
      warning: "bg-yellow-500",
      info: "bg-blue-500"
    }
  })

  return <div className={getVariant(type)}>{children}</div>
}
