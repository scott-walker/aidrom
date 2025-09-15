import { useRequests } from "@entities/request/api/request-queries"
import { Table } from "@ui/table"
import { Card } from "@ui/card"
import { Heading } from "@ui/heading"
import { Loader } from "@shared/ui/loader"
import { Notification } from "@shared/ui/notification"
import { RequestsDataTableItem } from "./requests-data-item"

/**
 * Таблица запросов к провайдерам
 * @namespace Widgets.RequestsDataTable.Ui.RequestsDataTable
 */
export const RequestsDataTable = () => {
  const { requests, isLoading, error } = useRequests()

  return (
    <Card>
      <Card.Header>
        <Heading>Запросы к провайдерам</Heading>
      </Card.Header>
      <Card.Body hasOffset={false}>
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Notification type="error">{(error as Error).message}</Notification>
        ) : (
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
                <RequestsDataTableItem key={request.id} request={request} />
              ))}
            </Table.Body>
          </Table>
        )}
      </Card.Body>
    </Card>
  )
}
