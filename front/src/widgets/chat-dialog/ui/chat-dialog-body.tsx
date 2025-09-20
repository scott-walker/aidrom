import { makeClasses } from "@lib/style-api"
import { type Chat } from "@entities/chat"
import { ChatMessages } from "@features/chat-messages"

/**
 * Пропсы компонента тела диалога
 * @namespace Widgets.Chat.ChatProps
 */
type ChatDialogBodyProps = {
  chat: Chat
  className?: string
}

/**
 * Тело диалога чата
 * @namespace Widgets.Chat
 */
export const ChatDialogBody = ({ chat, className = "" }: ChatDialogBodyProps) => {
  const bodyClasses = makeClasses("flex", "flex-col", "flex-1", "overflow-y-auto", "scrollbar-hide", className)

  return (
    <div className={bodyClasses}>
      <ChatMessages chat={chat} />
    </div>
  )
}
