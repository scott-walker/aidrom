import type { ReactNode } from "react"
import type { Toast as ToastType } from "./types"
import { Toast } from "./toast"
import { makeClasses } from "@shared/lib/style-api"

/**
 * Пропсы для контейнера уведомлений
 * @namespace Shared.Ui.Toasts.ToastsProps
 */
type ToastsProps = {
  toasts: ToastType[]
  onClose?: (id: string) => void
}

/**
 * Контейнер уведомлений
 * @namespace Shared.Ui.Toasts.Toasts
 */
export const Toasts = ({ toasts, onClose = () => {} }: ToastsProps): ReactNode => {
  const containerClasses = makeClasses(
    "fixed",
    "top-4",
    "right-1/2",
    "translate-x-1/2",
    "z-50",
    "flex",
    "flex-col",
    "gap-2"
  )

  return (
    <div className={containerClasses}>
      {toasts.map(toast => (
        <div key={toast.id} className="animate-in slide-in-from-top-full duration-300">
          <Toast
            type={toast.type}
            message={toast.message}
            description={toast.description}
            onClose={() => onClose(toast.id)}
          />
        </div>
      ))}
    </div>
  )
}
