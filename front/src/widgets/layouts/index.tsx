import { LayoutProvider } from "./provider"
import type { ReactNode } from "react"

import { Clean } from "./clean"
import { Main } from "./main"

/**
 * "Чистый" макет приложения
 * @namespace Widgets.Layouts.CleanLayout
 * @param {ReactNode} children дочерние элементы
 */
export const CleanLayout = ({ children }: { children: ReactNode }): ReactNode => {
  return (
    <LayoutProvider>
      <Clean>{children}</Clean>
    </LayoutProvider>
  )
}

/**
 * Главный макет приложения
 * @namespace Widgets.Layouts.MainLayout
 * @param {ReactNode} children дочерние элементы
 */
export const MainLayout = ({ children }: { children: ReactNode }): ReactNode => {
  return (
    <LayoutProvider>
      <Main>{children}</Main>
    </LayoutProvider>
  )
}
