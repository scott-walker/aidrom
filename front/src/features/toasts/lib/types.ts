import type { Toast as BaseToast } from "@ui/toasts"

/**
 * Уведомление
 * @namespace Features.Toasts.Lib.Types.Toast
 */
export interface Toast extends BaseToast {
  duration?: number
}

/**
 * Хранилище уведомлений
 * @namespace Features.Toasts.Lib.Types.ToastStore
 */
export interface ToastStore {
  toasts: Toast[]
  addToast: (data: Omit<Toast, "id">) => void
  removeToast: (id: string) => void
  clearToasts: () => void
}
