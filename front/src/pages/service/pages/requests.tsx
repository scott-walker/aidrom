import { type ReactNode } from "react"
import { useLayoutSubtitle } from "@lib/layout-api"
import { Blocks } from "@ui/blocks"
import { RequestsDataTable } from "@widgets/requests-data-table"

/**
 * Страница сервиса - запросы
 * @namespace Pages.Service.Requests
 * @returns {ReactNode}
 */
export const Requests = (): ReactNode => {
  useLayoutSubtitle("Запросы")

  return (
    <Blocks>
      <Blocks.Row>
        <Blocks.Block>
          <RequestsDataTable />
        </Blocks.Block>
      </Blocks.Row>
    </Blocks>
  )
}
