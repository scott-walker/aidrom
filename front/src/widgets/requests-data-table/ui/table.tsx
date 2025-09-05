import { Table } from "@ui/table"
import { Card } from "@ui/card"
import { Heading } from "@ui/heading"
import { useRequests } from "../model"
import type { RequestSchema } from "@entities/request/lib/types"

/**
 * Виджет. Таблица запросов к провайдерам
 * @namespace Widgets.RequestsDataTable.Ui.RequestsDataTable
 */
export const RequestsDataTable = () => {
  const { requests, isLoading, error } = useRequests()

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

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
              <Table.Head>Провайдер</Table.Head>
              <Table.Head>ID запроса</Table.Head>
              <Table.Head>Токены на вход</Table.Head>
              <Table.Head>Токены на выход</Table.Head>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {(requests as RequestSchema[]).map(request => (
              <Table.Row key={request.id}>
                <Table.Cell>{request.id}</Table.Cell>
                <Table.Cell>{request.provider}</Table.Cell>
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
