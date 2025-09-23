import { makeClasses } from "@lib/style-api"
import { Tooltip } from "@ui/tooltip"
import type { Request } from "../lib/schema"
import { RequestStatus as RequestStatusEnum } from "../lib/constants"

/**
 * Пропсы для компонента RequestStatus
 * @namespace Entities.Request.Ui.RequestStatus.Props
 */
type RequestStatusProps = {
  request: Request
  className?: string
}

/**
 * Статус запроса
 * @namespace Entities.Request.Ui.RequestStatus
 */
export const RequestStatus = ({ request, className = "" }: RequestStatusProps) => {
  const tagClasses = makeClasses(
    "w-5",
    "h-5",
    "rounded-full",
    "border-3",
    "border-background-soft",
    request.status === RequestStatusEnum.COMPLETED ? "bg-positive" : "bg-danger",
    className
  )
  return (
    <Tooltip text={request.status === RequestStatusEnum.COMPLETED ? "Выполнено" : "Ошибка"}>
      <div className={tagClasses} />
    </Tooltip>
  )
}
