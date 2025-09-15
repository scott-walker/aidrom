import type { ReactNode } from "react"
import { Lucent } from "@scottwalker/lucent"
import { Header } from "@widgets/layouts/ui/header"
import { Sidebar } from "@widgets/layouts/ui/sidebar"
import { Body } from "@widgets/layouts/ui/body"

/**
 * Главный макет приложения
 * @namespace Widgets.Layouts.Main
 * @param {ReactNode} children дочерние элементы
 */
export const Main = ({ children }: { children: ReactNode }): ReactNode => {
  return (
    <>
      <Lucent.Header>
        <Header />
      </Lucent.Header>

      <Lucent.Sidebar>
        <Sidebar />
      </Lucent.Sidebar>

      <Lucent.Body>
        <Body>{children}</Body>
      </Lucent.Body>
    </>
  )
}
