import { Card } from "@ui/card"
import { Heading } from "@ui/heading"
import { Json } from "@ui/json"
import { type Request } from "@entities/request"

/**
 * Пропсы для компонента RequestsParams
 * @namespace Entities.Request.Ui.RequestsParamsProps
 */
interface RequestsParamsProps {
  request: Request
}

/**
 * Параметры запроса к провайдеру
 * @namespace Entities.Request.Ui.RequestsParams
 */
export const RequestsParams = ({ request }: RequestsParamsProps) => {
  return (
    <Card>
      <Card.Header>
        <Heading>Параметры запроса</Heading>
      </Card.Header>
      <Card.Body>
        <Json value={request?.requestParams} interactive />
      </Card.Body>
    </Card>
  )
}
