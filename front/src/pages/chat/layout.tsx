import type { ReactNode } from "react"
import { useTitle } from "@lib/layout-api/utils"
import { makeClasses } from "@lib/style-api"

/**
 * Макет страницы
 * @namespace Pages.Chat.Layout
 */
export const Layout = ({ children }: { children: ReactNode }) => {
  useTitle("Чат")

  const containerClasses = makeClasses("flex flex-col gap-2")
  const agentsClasses = makeClasses("flex flex-col gap-2")
  const sidebarClasses = makeClasses("flex flex-col gap-2")
  const chatClasses = makeClasses("flex flex-col gap-2")

  return (
    <div className={containerClasses}>
      <aside className={sidebarClasses}></aside>
      <div className={chatClasses}>{children}</div>
      <aside className={agentsClasses}></aside>
    </div>
  )
}
