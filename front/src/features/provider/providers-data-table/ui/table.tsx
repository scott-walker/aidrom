import { Table } from "@ui/table"
import { Card } from "@ui/card"
import { Heading } from "@ui/heading"
import { useProviders } from "../model"
import { Code } from "@ui/code"

/**
 * Таблица провайдеров
 * @namespace Features.Provider.ProvidersDataTable.Ui.ProvidersDataTable
 */
export const ProvidersDataTable = () => {
  const { providers, isLoading, error } = useProviders()

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <Card>
      <Card.Header>
        <Heading>Зарегистрированные провайдеры</Heading>
      </Card.Header>
      <Card.Body hasOffset={false}>
        <Table>
          <Table.Header>
            <Table.Row hoverable={false}>
              <Table.Head>ID</Table.Head>
              <Table.Head>Драйвер</Table.Head>
              <Table.Head>Название</Table.Head>
              <Table.Head>Конфигурация</Table.Head>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {providers.map(provider => (
              <Table.Row key={provider.id}>
                <Table.Cell>{provider.id}</Table.Cell>
                <Table.Cell>{provider.name}</Table.Cell>
                <Table.Cell>{provider.driver}</Table.Cell>
                <Table.Cell>
                  <Code data={provider.config} />
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Card.Body>
    </Card>
  )
}
