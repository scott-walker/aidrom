import { makeClasses } from "@lib/style-api"
import { Loader } from "@ui/loader"
import { Notification } from "@ui/notification"
import { MessageList } from "@entities/chat/ui/message-list"
import { MessageEmptyList } from "@entities/chat/ui/message-empty-list"
import { useChatById } from "@entities/chat/api/chat-queries"
import { InputSection } from "./ui/input-section"
import type { Chat as ChatType } from "@entities/chat/lib/types"

/**
 * Пропсы чата
 * @namespace Widgets.Chat.ChatProps
 */
type ChatProps = {
  chatId: number
  className?: string
}

/**
 * Стуктура чата
 * @namespace Widgets.Chat
 */
export const Chat = ({ chatId, className = "" }: ChatProps) => {
  const { chat, isLoading, error } = useChatById(chatId)
  const { messages = [] } = (chat || {}) as ChatType
  const isEmpty = !messages.length

  if (isLoading) return <Loader />
  if (error) return <Notification type="error">{error.message}</Notification>

  const containerClasses = makeClasses("flex flex-col px-8 h-full", className)
  const bodyClasses = makeClasses("flex flex-col flex-1 py-8 overflow-y-auto scrollbar-hide")
  const inputClasses = makeClasses("flex flex-col ")

  return (
    <div className={containerClasses}>
      <div className={bodyClasses}>{isEmpty ? <MessageEmptyList /> : <MessageList messages={messages} />}</div>
      <div className={inputClasses}>
        <InputSection />
      </div>
    </div>
  )
}
