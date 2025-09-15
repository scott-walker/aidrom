import { makeClasses } from "@lib/style-api"
import type { Chat } from "@entities/chat"
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
  const containerClasses = makeClasses(
    "absolute",
    "bottom-0",
    "left-0",
    "right-0",
    "flex",
    "items-center",
    "justify-center",
    "px-8",
    "py-10",
    className
  )

  return (
    <div className={containerClasses}>
      <ChatInput className="w-2/3" chat={chat} />
    </div>
  )
}
