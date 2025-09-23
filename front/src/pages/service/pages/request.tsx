import { type ReactNode } from "react"
import { useParams } from "react-router"
import { useLayoutSubtitle } from "@lib/layout-api"
import { LoaderBlock } from "@ui/loader-block"
import { useRequestById } from "@entities/request"
import { RequestsData, RequestsParams, RequestsInfo } from "@entities/request"

/**
 * Страница сервиса - запрос
 * @namespace Pages.Service.Request
 */
export const Request = (): ReactNode => {
  const requestId = parseInt(useParams().requestId as string)
  const { request, isLoading } = useRequestById(requestId)

  useLayoutSubtitle(`Запрос #${request?.id}`)

  if (isLoading || !request) {
    return <LoaderBlock />
  }

  return (
    <div className="grid grid-cols-4 gap-8">
      <div className="col-span-1">
        <RequestsInfo request={request} />
      </div>
      <div className="col-span-3 flex flex-col gap-8">
        <RequestsParams request={request} />
        <RequestsData request={request} />
      </div>
    </div>
  )
}
