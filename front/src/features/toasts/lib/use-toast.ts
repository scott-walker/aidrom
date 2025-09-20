import { useToastStore } from "../store/toast-store"

/**
 * Хук для работы с уведомлениями
 * @namespace Features.Toasts.Lib.useToast
 */
export const useToast = () => {
  const { addToast, removeToast, clearToasts } = useToastStore()
  const defaultDuration = 4000

  return {
    success: (message: string, description?: string) => {
      addToast({ type: "success", message, duration: defaultDuration, description })
    },
    error: (message: string, description?: string) => {
      addToast({ type: "error", message, duration: defaultDuration, description })
    },
    warning: (message: string, description?: string) => {
      addToast({ type: "warning", message, duration: defaultDuration, description })
    },
    info: (message: string, description?: string) => {
      addToast({ type: "info", message, duration: defaultDuration, description })
    },
    remove: removeToast,
    clear: clearToasts
  }
}
