import type { ReactNode } from "react"
import { Body } from "@widgets/layouts/ui/body"

/**
 * "Чистый" макет приложения
 * @namespace Widgets.Layouts.Clean
 * @param {ReactNode} children дочерние элементы
 */
export const Clean = ({ children }: { children: ReactNode }): ReactNode => {
  return (
    <>
      <Body>{children}</Body>
    </>
  )
}
