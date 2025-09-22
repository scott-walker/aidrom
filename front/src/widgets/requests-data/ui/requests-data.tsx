import { Card } from "@ui/card"
import { Heading } from "@ui/heading"
import { Json } from "@ui/json"
import { type Request } from "@entities/request"

/**
 * Пропсы для компонента RequestsData
 * @namespace Widgets.RequestsData.Ui.RequestsDataProps
 */
interface RequestsDataProps {
  request: Request
}

/**
 * Данные запроса к провайдеру
 * @namespace Widgets.RequestsData.Ui.RequestsData
 */
export const RequestsData = ({ request }: RequestsDataProps) => {
  return (
    <Card>
      <Card.Header>
        <Heading>Данные ответа</Heading>
      </Card.Header>
      <Card.Body>
        <Json value={request?.responseData} interactive />
      </Card.Body>
    </Card>
  )
}
