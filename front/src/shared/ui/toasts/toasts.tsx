import type { ReactNode } from "react"
import type { Toast as ToastType } from "./types"
import { Toast } from "./toast"

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
  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map(toast => (
        <div key={toast.id} className="animate-in slide-in-from-right-full duration-300">
          <Toast type={toast.type} title={toast.title} message={toast.message} onClose={() => onClose(toast.id)} />
        </div>
      ))}
    </div>
  )
}
