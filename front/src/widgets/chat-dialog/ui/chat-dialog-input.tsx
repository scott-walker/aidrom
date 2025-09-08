import { makeClasses } from "@lib/style-api"
import type { Chat } from "@entities/chat/lib/types"
import { ChatInput } from "@features/chat-input"

/**
 * Пропсы компонента ввода сообщения
 * @namespace Widgets.Chat.ChatProps
 */
type ChatDialogInputProps = {
  chat: Chat
  className?: string
}

/**
 * Ввод сообщения в диалог чата
 * @namespace Widgets.Chat
 */
export const ChatDialogInput = ({ chat, className = "" }: ChatDialogInputProps) => {
  const containerClasses = makeClasses("flex", "items-center", "justify-center", className)

  return (
    <div className={containerClasses}>
      <ChatInput chat={chat} />
    </div>
  )
}
