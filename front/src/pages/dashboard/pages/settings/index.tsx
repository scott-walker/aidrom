import type { ReactNode } from "react"
import { createPage, type PageConfig } from "@lib/page-api"

/**
 * Конфигурация страницы
 */
const config: PageConfig = {
  meta: {
    title: "Dashboard: Настройки"
  },
  slots: {
    // header: <Heading level={2}>Настройки</Heading>
    // sidebar: <h2>Dashboard Settings Sidebar</h2>,
    // infobar: <h2>Dashboard Settings Infobar</h2>,
    // footer: <h2>Dashboard Settings Footer</h2>
  }
}

/**
 * Страница настроек
 */
export const DashboardSettings = createPage(config, (): ReactNode => {
  return (
    <div className="flex flex-col">
      <h1>Страница "Dashboard Settings"</h1>
      <div>Настройки управления</div>
    </div>
  )
})
