import type { ReactNode } from "react"

/**
 * "Чистый" макет приложения
 * @namespace Widgets.Layouts.Clean
 * @param {ReactNode} children дочерние элементы
 */
export const Clean = ({ children }: { children: ReactNode }): ReactNode => {
  return <>{children}</>
}
