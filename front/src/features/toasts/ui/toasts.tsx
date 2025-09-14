import { Toasts as ToastsComponent } from "@ui/toasts"
import { useToastStore } from "../model/toast-store"

/**
 * Компонент для отображения уведомлений
 * @namespace Features.Toasts.Ui.Toasts
 */
export const Toasts = () => {
  const { toasts, removeToast } = useToastStore()

  return <ToastsComponent toasts={toasts} onClose={removeToast} />
}
