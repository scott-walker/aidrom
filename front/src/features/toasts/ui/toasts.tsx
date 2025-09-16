import { createPortal } from "react-dom"
import { Toasts as ToastsComponent } from "@ui/toasts"
import { useToastStore } from "../model/toast-store"

/**
 * Компонент для отображения уведомлений
 * @namespace Features.Toasts.Ui.Toasts
 */
export const Toasts = () => {
  const { toasts, removeToast } = useToastStore()

  return createPortal(<ToastsComponent toasts={toasts} onClose={removeToast} />, document.body)
}
