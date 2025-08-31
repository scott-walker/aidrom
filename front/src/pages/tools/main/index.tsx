import type { ReactNode } from "react"
import { createPage, type PageConfig } from "@lib/page-api"

/**
 * Конфигурация страницы
 */
const config: PageConfig = {
  meta: {
    title: "Tools Main"
  }
}

/**
 * Главная страница инструментов
 * @namespace Pages.Tools
 * @returns {ReactNode}
 */
export const ToolsMain = createPage(config, (): ReactNode => {
  return (
    <div>
      <h1>ToolsMain</h1>
    </div>
  )
})
