import type { ReactNode } from "react"
import { makeClasses } from "@lib/style-api"
import { Header } from "@shared/ui/layout/ui/header"
import { Sidebar } from "@shared/ui/layout/ui/sidebar"
import { Body } from "@shared/ui/layout/ui/body"

/**
 * Главный макет приложения
 * @namespace Widgets.Layouts.Main
 * @param {ReactNode} children дочерние элементы
 */
export const Main = ({ children }: { children: ReactNode }): ReactNode => {
  const containerClasses = makeClasses(
    "fixed",
    "inset-0",
    "grid",
    "grid-cols-[var(--layout-sidebar-width)_1fr]",
    "grid-rows-[var(--layout-header-height)_1fr]",
    "h-[100vh]",
    "w-[100vw]",
    "overflow-hidden"
  )
  const sidebarClasses = makeClasses("col-1", "row-span-2")
  const headerClasses = makeClasses("col-2", "row-1", "w-full")
  const bodyClasses = makeClasses("col-2", "row-2", "w-full")

  return (
    <div className={containerClasses}>
      <Sidebar className={sidebarClasses} />
      <Header className={headerClasses} />
      <Body className={bodyClasses}>{children}</Body>
    </div>
  )
}
