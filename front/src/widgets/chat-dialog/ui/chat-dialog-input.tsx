import { makeClasses } from "@lib/style-api"
import { ChatInput } from "@features/chat-input"

/**
 * Пропсы компонента ввода сообщения
 * @namespace Widgets.Chat.ChatProps
 */
type ChatDialogInputProps = {
  chatId: number
  className?: string
}

/**
 * Ввод сообщения в диалог чата
 * @namespace Widgets.Chat
 */
export const ChatDialogInput = ({ chatId, className = "" }: ChatDialogInputProps) => {
  const containerClasses = makeClasses(
    "absolute",
    "bottom-0",
    "left-0",
    "right-0",
    "flex",
    "items-center",
    "justify-center",
    "py-10",
    className
  )

  return (
    <div className={containerClasses}>
      <ChatInput chatId={chatId} />
    </div>
  )
}
