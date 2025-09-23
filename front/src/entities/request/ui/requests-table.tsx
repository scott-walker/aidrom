import { makeClasses } from "@lib/style-api"
import { Table } from "@ui/table"
import { Card } from "@ui/card"
import { Heading } from "@ui/heading"
import type { Request } from "../lib/schema"

/**
 * Пропсы для компонента RequestsTable
 * @namespace Entities.Request.Ui.RequestsTableProps
 */
interface RequestsTableProps {
  requests: Request[]
  onRowClick?: (request: Request) => void
}

/**
 * Таблица запросов к провайдерам
 * @namespace Widgets.RequestsTable.Ui.RequestsTable
 */
export const RequestsTable = ({ requests, onRowClick }: RequestsTableProps) => {
  const rowClasses = makeClasses("border-b border-border")

  return (
    <Card>
      <Card.Header>
        <Heading>Запросы к провайдерам</Heading>
      </Card.Header>

      <Card.Body hasOffset={false}>
        <Table>
          <Table.Header>
            <Table.Row hoverable={false}>
              <Table.Head>ID</Table.Head>
              <Table.Head>Статус</Table.Head>
              <Table.Head>Провайдер</Table.Head>
              <Table.Head>ID запроса</Table.Head>
              <Table.Head>Токены на вход</Table.Head>
              <Table.Head>Токены на выход</Table.Head>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {requests.map(request => (
              <Table.Row hoverable className={rowClasses} onClick={() => onRowClick?.(request)}>
                <Table.Cell>{request.id}</Table.Cell>
                <Table.Cell>{request.status}</Table.Cell>
                <Table.Cell>{request.provider.name}</Table.Cell>
                <Table.Cell>{request.providerRequestId}</Table.Cell>
                <Table.Cell>{request.requestTokens}</Table.Cell>
                <Table.Cell>{request.responseTokens}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Card.Body>
    </Card>
  )
}
