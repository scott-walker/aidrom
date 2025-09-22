import { type ReactNode } from "react"
import { useLayoutSubtitle } from "@lib/layout-api"
import { RequestsTable } from "@widgets/requests-table"

/**
 * Страница сервиса - запросы
 * @namespace Pages.Service.Requests
 * @returns {ReactNode}
 */
export const Requests = (): ReactNode => {
  useLayoutSubtitle("Запросы")

  return <RequestsTable />
}
