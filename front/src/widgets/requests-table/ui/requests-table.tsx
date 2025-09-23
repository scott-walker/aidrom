import { useRequests } from "@entities/request/api/request-queries"
import { Table } from "@ui/table"
import { Card } from "@ui/card"
import { Heading } from "@ui/heading"
import { Loader } from "@ui/loader/loader"
import { Notification } from "@ui/notification"
import type { RequestsFilterData } from "@entities/request"
import { RequestsItem } from "./requests-item"

/**
 * Таблица запросов к провайдерам
 * @namespace Widgets.RequestsTable.Ui.RequestsTable
 */
export const RequestsTable = ({ filters }: { filters: RequestsFilterData }) => {
  const { requests, isLoading, error } = useRequests(filters)

  if (isLoading) {
    return <Loader />
  }

  if (error) {
    return <Notification type="error">{(error as Error).message}</Notification>
  }

  if (requests.length === 0) {
    return <Notification type="info">Запросов не найдено</Notification>
  }

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
            {requests.map(request => (
              <RequestsItem key={request.id} request={request} />
            ))}
          </Table.Body>
        </Table>
      </Card.Body>
    </Card>
  )
}
