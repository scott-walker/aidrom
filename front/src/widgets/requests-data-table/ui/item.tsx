import { useState } from "react"
import { Table } from "@ui/table"
import { Heading } from "@ui/heading"
import { Code } from "@ui/code"
import type { RequestSchema } from "@entities/request/lib/types"
import { useRequestById } from "@entities/request/model/queries"
import { cn } from "@utils/jsxtools"

export const Item = ({ request }: { request: RequestSchema }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [requestId, setRequestId] = useState<number | null>(null)
  const { request: requestDetails } = useRequestById(requestId)

  const onToggleOpen = () => {
    setIsOpen(!isOpen)
    setRequestId(isOpen ? null : request.id)
  }

  const classes = cn(isOpen && "text-primary", isOpen && "border-primary hover:border-primary")
  const detailsClasses = cn("max-w-0", "py-6", "w-full", "bg-background", isOpen && "border-b-2 border-primary")
  const detailsInnerClasses = cn("flex", "flex-col", "items-start", "justify-start", "gap-6", "w-full", "bg-background")
  const detailsCodeClasses = cn("overflow-x-auto", "w-full")

  return (
    <>
      <Table.Row onClick={onToggleOpen} hoverable className={classes}>
        <Table.Cell>{request.id}</Table.Cell>
        <Table.Cell>{request.provider}</Table.Cell>
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
                <Code data={requestDetails.requestParams} interactive />
              </div>
              <Heading>Ответ провайдера</Heading>
              <div className={detailsCodeClasses}>
                <Code data={requestDetails.responseData} interactive />
              </div>
            </div>
          </Table.Cell>
        </Table.Row>
      )}
    </>
  )
}
