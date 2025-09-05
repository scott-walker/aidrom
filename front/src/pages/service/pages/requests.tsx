import { type ReactNode } from "react"
import { Blocks } from "@shared/ui/blocks"
import { RequestsDataTable } from "@widgets/requests-data-table/ui/table"
import { useSubtitle } from "@shared/lib/layout-api/utils"

/**
 * Страница сервиса - запросы
 * @namespace Pages.Service.Requests
 * @returns {ReactNode}
 */
export const Requests = (): ReactNode => {
  useSubtitle("Запросы")

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
