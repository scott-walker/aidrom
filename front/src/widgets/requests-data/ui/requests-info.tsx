import { makeClasses } from "@lib/style-api"
import { type Request } from "@entities/request"
import { Card } from "@shared/ui/card"
import { Heading } from "@shared/ui/heading"

/**
 * Пропсы для компонента RequestsInfo
 * @namespace Widgets.RequestsData.Ui.RequestsInfoProps
 */
interface RequestsInfoProps {
  request: Request
}

/**
 * Информация о запросе к провайдеру
 * @namespace Widgets.RequestsData.Ui.RequestsInfo
 */
export const RequestsInfo = ({ request }: RequestsInfoProps) => {
  const sectionClasses = makeClasses("flex", "flex-col", "items-start", "justify-start", "gap-4")
  const sectionLabelClasses = makeClasses("text-base", "font-bold")
  const sectionValueClasses = makeClasses("text-lg")

  return (
    <Card>
      <Card.Header>
        <Heading>Информация о запросе</Heading>
      </Card.Header>
      <Card.Body>
        <div className={sectionClasses}>
          <section>
            <div className={sectionLabelClasses}>ID запроса (на стороне сервиса)</div>
            <div className={sectionValueClasses}>{request?.id}</div>
          </section>
          <section>
            <div className={sectionLabelClasses}>ID запроса (на стороне провайдера)</div>
            <div className={sectionValueClasses}>{request?.providerRequestId}</div>
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
