import { type ReactNode } from "react"
import { createPage, type PageConfig } from "@lib/page-api"
import { Heading } from "@ui/heading"
import { Blocks } from "@shared/ui/blocks"

/**
 * Конфигурация страницы
 * @namespace Pages.Constructor.ConstructorSettings.PageConfig
 */
const config: PageConfig = {
  meta: {
    title: "Конструктор",
    subtitle: "Настройки"
  }
}

/**
 * Страница настроек конструктора
 * @namespace Pages.Constructor.ConstructorSettings
 * @returns {ReactNode}
 */
export const ConstructorSettings = createPage(config, (): ReactNode => {
  return (
    <Blocks>
      <Blocks.Row>
        <Blocks.Block>
          <Heading>Настройки</Heading>
        </Blocks.Block>
      </Blocks.Row>
    </Blocks>
  )
})
