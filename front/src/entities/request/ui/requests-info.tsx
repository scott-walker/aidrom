import { makeClasses } from "@lib/style-api"
import { Card } from "@ui/card"
import { Heading } from "@ui/heading"
import { type Request } from "@entities/request"
import { RequestStatus } from "./request-status"
import { RequestValue } from "./request-value"

/**
 * Пропсы для компонента RequestsInfo
 * @namespace Entities.Request.Ui.RequestsInfoProps
 */
interface RequestsInfoProps {
  request: Request
}

/**
 * Информация о запросе к провайдеру
 * @namespace Entities.Request.Ui.RequestsInfo
 */
export const RequestsInfo = ({ request }: RequestsInfoProps) => {
  const sectionClasses = makeClasses("flex", "flex-col", "items-start", "justify-start", "gap-4")
  const sectionLabelClasses = makeClasses("text-base", "font-bold")
  const sectionValueClasses = makeClasses("text-lg")

  return (
    <Card>
      <Card.Header>
        <Heading>Информация</Heading>
        <RequestStatus request={request} />
      </Card.Header>
      <Card.Body>
        <div className={sectionClasses}>
          <section>
            <div className={sectionLabelClasses}>ID запроса (на стороне сервиса)</div>
            <div className={sectionValueClasses}>{request?.id}</div>
          </section>
          <section>
            <div className={sectionLabelClasses}>ID запроса (на стороне провайдера)</div>
            <div className={sectionValueClasses}>
              <RequestValue>{request?.providerRequestId}</RequestValue>
            </div>
          </section>
          <section>
            <div className={sectionLabelClasses}>Провайдер</div>
            <div className={sectionValueClasses}>{request?.provider.name}</div>
          </section>
          <section>
            <div className={sectionLabelClasses}>Токены на вход</div>
            <div className={sectionValueClasses}>{request?.requestTokens}</div>
          </section>
          <section>
            <div className={sectionLabelClasses}>Токены на выход</div>
            <div className={sectionValueClasses}>{request?.responseTokens}</div>
          </section>
        </div>
      </Card.Body>
    </Card>
  )
}
