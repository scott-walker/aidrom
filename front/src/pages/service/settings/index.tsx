import { type ReactNode } from "react"
import { createPage, type PageConfig } from "@lib/page-api"
import { Heading } from "@ui/heading"
import { Blocks } from "@shared/ui/blocks"

/**
 * Конфигурация страницы
 * @namespace Pages.Service.ServiceSettings.PageConfig
 */
const config: PageConfig = {
  meta: {
    title: "Сервис",
    subtitle: "Настройки"
  }
}

/**
 * Страница настроек сервиса
 * @namespace Pages.Service.ServiceSettings
 * @returns {ReactNode}
 */
export const ServiceSettings = createPage(config, (): ReactNode => {
  return (
    <Blocks>
      <Blocks.Row>
        <Blocks.Block>
          <Heading>Настройки сервиса</Heading>
        </Blocks.Block>
      </Blocks.Row>
    </Blocks>
  )
})
