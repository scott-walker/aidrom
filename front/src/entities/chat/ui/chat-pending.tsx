import { makeClasses } from "@lib/style-api"
import { Icon } from "@ui/icon"
import { InlineLoader } from "@ui/loader"

/**
 * Пропсы компонента ожидания ответа
 * @namespace Entities.Chat.UI.ChatPendingProps
 */
type ChatPendingProps = {
  className?: string
}

/**
 * Чат в процессе отправки сообщения
 * @namespace Entities.Chat.UI.ChatPending
 */
export const ChatPending = ({ className = "" }: ChatPendingProps) => {
  return (
    <div className={makeClasses("flex flex-col items-center", className)}>
      <Icon name="bot-message-square" className="text-foreground-soft/60" size={42} />
      <div className="mt-2">
        <InlineLoader />
      </div>
    </div>
  )
}
