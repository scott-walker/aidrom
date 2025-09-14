import { useToastStore } from "../model/toast-store"
import type { Toast } from "./types"

/**
 * Хук для работы с уведомлениями
 * @namespace Features.Toasts.Lib.useToast
 */
export const useToast = () => {
  const { addToast, removeToast, clearToasts } = useToastStore()
  const defaultDuration = 40000

  return {
    success: (message: string, options?: Partial<Toast>) => {
      addToast({ type: "success", message, duration: defaultDuration, ...options })
    },
    error: (message: string, options?: Partial<Toast>) => {
      addToast({ type: "error", message, duration: defaultDuration, ...options })
    },
    warning: (message: string, options?: Partial<Toast>) => {
      addToast({ type: "warning", message, duration: defaultDuration, ...options })
    },
    info: (message: string, options?: Partial<Toast>) => {
      addToast({ type: "info", message, duration: defaultDuration, ...options })
    },
    remove: removeToast,
    clear: clearToasts
  }
}
