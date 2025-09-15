import { useState } from "react"
import { makeClasses } from "@lib/style-api"
import { Table } from "@ui/table"
import { Heading } from "@ui/heading"
import { Json } from "@ui/json"
import { type Request, useRequestById } from "@entities/request"

/**
 * Строка таблицы запросов к провайдерам
 * @namespace Widgets.RequestsDataTable.Ui.RequestsDataTableItem
 */
export const RequestsDataTableItem = ({ request }: { request: Request }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [requestId, setRequestId] = useState<number | null>(null)
  const { request: requestDetails } = useRequestById(requestId)

  const classes = makeClasses(isOpen && "text-primary", isOpen && "border-primary hover:border-primary")
  const detailsClasses = makeClasses(
    "max-w-0",
    "py-6",
    "w-full",
    "bg-background",
    isOpen && "border-b-2 border-primary"
  )
  const detailsInnerClasses = makeClasses(
    "flex",
    "flex-col",
    "items-start",
    "justify-start",
    "gap-6",
    "w-full",
    "bg-background"
  )
  const detailsCodeClasses = makeClasses("overflow-x-auto", "w-full")

  const onToggleOpen = () => {
    setIsOpen(!isOpen)
    setRequestId(isOpen ? null : request.id)
  }

  return (
    <>
      <Table.Row onClick={onToggleOpen} hoverable className={classes}>
        <Table.Cell>{request.id}</Table.Cell>
        <Table.Cell>{request.provider.name}</Table.Cell>
        <Table.Cell>{request.providerRequestId}</Table.Cell>
        <Table.Cell>{request.requestTokens}</Table.Cell>
        <Table.Cell>{request.responseTokens}</Table.Cell>
      </Table.Row>
      {requestDetails && (
        <Table.Row>
          <Table.Cell colSpan={5} className={detailsClasses}>
            <div className={detailsInnerClasses}>
              <Heading>Параметры запроса к провайдеру</Heading>
              <div className={detailsCodeClasses}>
                <Json value={requestDetails.requestParams} interactive />
              </div>
              <Heading>Ответ провайдера</Heading>
              <div className={detailsCodeClasses}>
                <Json value={requestDetails.responseData} interactive />
              </div>
            </div>
          </Table.Cell>
        </Table.Row>
      )}
    </>
  )
}
