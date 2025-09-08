import { makeClasses } from "@lib/style-api"
import { MessageList } from "@entities/chat/ui/message-list"
import { MessageEmptyList } from "@entities/chat/ui/message-empty-list"
import { MessageInput } from "@features/chat/send-message/ui/message-input"
import { SendButton } from "@features/chat/send-message/ui/send-button"
import type { Chat } from "@entities/chat/lib/types"

/**
 * Пропсы чата
 * @namespace Widgets.Chat.ChatProps
 */
type ChatProps = {
  chat: Chat
  className?: string
}

/**
 * Стуктура чата
 * @namespace Widgets.Chat
 */
export const ChatDialog = ({ chat, className = "" }: ChatProps) => {
  const { messages = [] } = (chat || {}) as Chat
  const isEmpty = !messages.length

  const containerClasses = makeClasses("flex flex-col px-8 h-full", className)
  const bodyClasses = makeClasses("flex flex-col flex-1 py-8 overflow-y-auto scrollbar-hide")
  const inputClasses = makeClasses("relative", "flex", "flex-col", "items-center", "justify-end", "gap-2", "pb-6")
  const sendButtonClasses = makeClasses("absolute", "right-6")

  return (
    <div className={containerClasses}>
      <div className={bodyClasses}>{isEmpty ? <MessageEmptyList /> : <MessageList messages={messages} />}</div>
      <div className={inputClasses}>
        <MessageInput />
        <SendButton className={sendButtonClasses} />
      </div>
    </div>
  )
}
