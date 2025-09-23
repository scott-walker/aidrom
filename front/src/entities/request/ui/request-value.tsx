import type { ReactNode } from "react"

/**
 * Пропсы для компонента RequestValue
 * @namespace Entities.Request.Ui.RequestValue.Props
 */
type RequestValueProps = {
  children: ReactNode
}

/**
 * Значение поля запроса
 * @namespace Entities.Request.Ui.RequestValue
 */
export const RequestValue = ({ children }: RequestValueProps) => {
  if (children === null || children === "" || children === undefined) {
    return <span className="text-foreground/40 text-sm">Значение не установлено</span>
  }

  return children
}
