import { create } from "zustand"
import { type Toast, type ToastStore } from "../lib/types"

/**
 * Хранилище уведомлений
 * @namespace Features.Toasts.Model.useToastStore
 */
export const useToastStore = create<ToastStore>((set, get) => ({
  toasts: [],

  /**
   * Добавить уведомление
   * @namespace Features.Toasts.Model.useToastStore.addToast
   */
  addToast: (data: Omit<Toast, "id">) => {
    const id = crypto.randomUUID()
    const toast = { ...data, id }

    set(state => ({ toasts: [...state.toasts, toast] }))

    if (toast.duration) {
      setTimeout(() => get().removeToast(id), toast.duration)
    }
  },

  /**
   * Удалить уведомление
   * @namespace Features.Toasts.Model.useToastStore.removeToast
   */
  removeToast: (id: string) => {
    set(state => ({ toasts: state.toasts.filter(t => t.id !== id) }))
  },

  /**
   * Очистить уведомления
   * @namespace Features.Toasts.Model.useToastStore.clearToasts
   */
  clearToasts: () => set({ toasts: [] })
}))
