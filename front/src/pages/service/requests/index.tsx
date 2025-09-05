import { type ReactNode } from "react"
import { createPage, type PageConfig } from "@lib/page-api"
import { Blocks } from "@shared/ui/blocks"
import { RequestsDataTable } from "@widgets/requests-data-table/ui/table"

/**
 * Конфигурация страницы
 * @namespace Pages.Service.ServiceRequests.PageConfig
 */
const config: PageConfig = {
  meta: {
    title: "Сервис",
    subtitle: "Запросы к провайдерам"
  }
}

/**
 * Страница сервиса - запросы
 * @namespace Pages.Service.ServiceRequests
 * @returns {ReactNode}
 */
export const ServiceRequests = createPage(config, (): ReactNode => {
  return (
    <Blocks>
      <Blocks.Row>
        <Blocks.Block>
          <RequestsDataTable />
        </Blocks.Block>
      </Blocks.Row>
    </Blocks>
  )
})
