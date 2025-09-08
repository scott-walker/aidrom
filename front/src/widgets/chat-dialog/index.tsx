import type { ReactNode } from "react"
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
  children?: ReactNode
}

/**
 * Стуктура чата
 * @namespace Widgets.Chat
 */
export const ChatDialog = ({ chat, className = "", children = null }: ChatProps) => {
  const { messages = [] } = (chat || {}) as Chat
  const isEmpty = !messages.length

  const containerClasses = makeClasses("relative flex flex-col px-8 h-full", className)
  const headerClasses = makeClasses("absolute top-0 left-0 right-0 py-4 text-center")
  const bodyClasses = makeClasses("flex flex-col flex-1 py-8 overflow-y-auto scrollbar-hide")
  const inputClasses = makeClasses("relative", "flex", "items-center", "justify-end", "gap-2", "pb-6")
  const sendButtonClasses = makeClasses("absolute", "right-6")

  return (
    <div className={containerClasses}>
      {children && <div className={headerClasses}>{children}</div>}

      <div className={bodyClasses}>{isEmpty ? <MessageEmptyList /> : <MessageList messages={messages} />}</div>
      <div className={inputClasses}>
        <MessageInput />
        <SendButton className={sendButtonClasses} />
      </div>
    </div>
  )
}
