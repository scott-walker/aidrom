import { makeClasses } from "@lib/style-api"
import { Notification } from "@ui/notification"

/**
 * Пропсы для компонента
 * @namespace Shared.UI.ErrorBlock.Props
 */
type ErrorBlockProps = {
  error: Error
  className?: string
}

/**
 * Ошибка (блочное отображение)
 * @namespace Shared.UI.ErrorBlock
 */
export const ErrorBlock = ({ error, className = "" }: ErrorBlockProps) => {
  const containerClasses = makeClasses("flex", "items-center", "justify-center", "h-full", "w-full", className)

  return (
    <div className={containerClasses}>
      <Notification type="error" className="justify-center w-full h-full">
        {error.message}
      </Notification>
    </div>
  )
}
