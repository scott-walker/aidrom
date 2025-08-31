import type { ReactNode } from "react"
import { LayoutProvider } from "../provider"
import { Structure } from "./structure"

/**
 * "Чистый" макет приложения
 * @namespace Widgets.Layouts.Clean
 * @param {ReactNode} children дочерние элементы
 */
export const Clean = ({ children }: { children: ReactNode }): ReactNode => {
  return (
    <LayoutProvider>
      <Structure>{children}</Structure>
    </LayoutProvider>
  )
}
