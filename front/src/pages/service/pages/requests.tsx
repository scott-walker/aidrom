import { type ReactNode } from "react"
import { useSearchParams } from "react-router"
import { useLayoutSubtitle } from "@lib/layout-api"
import { RequestDataManager } from "@features/request-data-manager"
import { RequestsTable } from "@widgets/requests-table"

/**
 * Страница сервиса - запросы
 * @namespace Pages.Service.Requests
 * @returns {ReactNode}
 */
export const Requests = (): ReactNode => {
  const [searchParams, setSearchParams] = useSearchParams()
  const filters = Object.fromEntries(searchParams.entries())

  useLayoutSubtitle("Запросы")

  return (
    <div className="flex flex-col gap-4">
      <RequestDataManager onFilterQuery={setSearchParams} />
      <RequestsTable filters={filters} />
    </div>
  )
}
