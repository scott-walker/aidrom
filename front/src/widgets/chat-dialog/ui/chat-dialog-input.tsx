import { makeClasses } from "@lib/style-api"
import { ChatInput } from "@features/chat-input"
import { useChatStore, ChatPending } from "@entities/chat"

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
  const isPending = useChatStore(state => state.isPending)

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
      {isPending && <ChatPending className={pendingClasses} />}
      {!isPending && <ChatInput chatId={chatId} />}
    </div>
  )
}
