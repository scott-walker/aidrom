import { type ReactNode } from "react"
import { createPage, type PageConfig } from "@lib/page-api"
import { Heading } from "@ui/heading"
import { Blocks } from "@shared/ui/blocks"

/**
 * Конфигурация страницы
 * @namespace Pages.Constructor.ConstructorAgents.PageConfig
 */
const config: PageConfig = {
  meta: {
    title: "Конструктор",
    subtitle: "Агенты"
  }
}

/**
 * Страница конструктора - агенты
 * @namespace Pages.Constructor.ConstructorAgents
 * @returns {ReactNode}
 */
export const ConstructorAgents = createPage(config, (): ReactNode => {
  return (
    <Blocks>
      <Blocks.Row>
        <Blocks.Block>
          <Heading>Агенты</Heading>
        </Blocks.Block>
      </Blocks.Row>
    </Blocks>
  )
})
