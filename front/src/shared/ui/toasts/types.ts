/**
 * Типы типов уведомлений
 * @namespace Shared.Ui.Toasts.Types.ToastType
 */
export type ToastType = "success" | "error" | "warning" | "info"

/**
 * Уведомление
 * @namespace Shared.Ui.Toasts.Types.Toast
 */
export type Toast = {
  id: string
  type: ToastType
  message: string
  description?: string
}
