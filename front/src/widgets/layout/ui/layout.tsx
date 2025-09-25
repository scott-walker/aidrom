import type { ReactNode } from "react"
import { makeClasses } from "@lib/style-api"
import { LayoutHeader } from "@widgets/layout-header"
import { LayoutSidebar } from "@widgets/layout-sidebar"
import { LayoutBody } from "@widgets/layout-body"

/**
 * Главный макет приложения
 * @namespace Widgets.Layout
 * @param {ReactNode} children дочерние элементы
 */
export const Layout = ({ children }: { children: ReactNode }): ReactNode => {
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
      <LayoutSidebar className={sidebarClasses} />
      <LayoutHeader className={headerClasses} />
      <LayoutBody className={bodyClasses}>{children}</LayoutBody>
    </div>
  )
}
