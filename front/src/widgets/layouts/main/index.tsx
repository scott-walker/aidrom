import type { ReactNode } from "react"
import { LayoutProvider } from "../provider"
import { Structure } from "./structure"

/**
 * Главный макет приложения
 * @namespace Widgets.Layouts.Main
 * @param {ReactNode} children дочерние элементы
 */
export const Main = ({ children }: { children: ReactNode }): ReactNode => {
  return (
    <LayoutProvider>
      <Structure>{children}</Structure>
    </LayoutProvider>
  )
}
