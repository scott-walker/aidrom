import { makeClasses } from "@lib/style-api"
import { ChatInput } from "@features/chat-input"
import { ChatPending } from "@features/chat-pending"

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
    "z-20",
    "bottom-0",
    "left-0",
    "right-0",
    "flex",
    "items-center",
    "justify-center",
    "py-10",
    className
  )
  const pendingClasses = makeClasses(
    "absolute",
    "z-10",
    "-top-18",
    "p-4",
    "bg-background-soft",
    "rounded-2xl",
    "shadow-md/15"
  )

  return (
    <div className={containerClasses}>
      <ChatPending className={pendingClasses} />
      <ChatInput chatId={chatId} />
    </div>
  )
}
