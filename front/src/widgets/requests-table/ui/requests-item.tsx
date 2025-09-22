import { useNavigate } from "react-router"
import { makeClasses } from "@lib/style-api"
import { Table } from "@ui/table"
import { type Request } from "@entities/request"

/**
 * Строка таблицы запросов к провайдерам
 * @namespace Widgets.RequestsDataTable.Ui.RequestsDataTableItem
 */
export const RequestsItem = ({ request }: { request: Request }) => {
  const classes = makeClasses("border-b border-border")
  const navigate = useNavigate()

  const onRowClick = () => {
    navigate(`/service/requests/${request.id}`)
  }

  return (
    <>
      <Table.Row hoverable className={classes} onClick={onRowClick}>
        <Table.Cell>{request.id}</Table.Cell>
        <Table.Cell>{request.provider.name}</Table.Cell>
        <Table.Cell>{request.providerRequestId}</Table.Cell>
        <Table.Cell>{request.requestTokens}</Table.Cell>
        <Table.Cell>{request.responseTokens}</Table.Cell>
      </Table.Row>
    </>
  )
}
