import type { ReactNode } from "react"
import { Body } from "@widgets/ui/layout/body"

/**
 * Структура макета
 * @namespace Widgets.Layouts.Clean.Structure
 * @param {ReactNode} children дочерние элементы
 */
export const Structure = ({ children }: { children: ReactNode }): ReactNode => {
  return (
    <>
      <Body>{children}</Body>
    </>
  )
}
