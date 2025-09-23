import { type ReactNode } from "react"
import { useLayoutSubtitle } from "@lib/layout-api"
import { RequestDataManager } from "@features/request-data-manager"
import { RequestsTable } from "@widgets/requests-table"

/**
 * Страница сервиса - запросы
 * @namespace Pages.Service.Requests
 * @returns {ReactNode}
 */
export const Requests = (): ReactNode => {
  useLayoutSubtitle("Запросы")

  return (
    <div className="flex flex-col gap-4">
      <RequestDataManager />
      <RequestsTable />
    </div>
  )
}
