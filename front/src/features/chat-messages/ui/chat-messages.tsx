import { makeClasses } from "@lib/style-api"
import { type Chat } from "@entities/chat"
import { ChatNoneMessages } from "./chat-none-messages"
import { ChatPrevMessages } from "./chat-prev-messages"
import { ChatLastMessages } from "./chat-last-messages"
import { useScrollMessages } from "../lib/use-scroll-messages"

/**
 * Пропсы компонента сообщений
 * @namespace Features.ChatMessages.Props
 */
type ChatMessagesProps = {
  chat: Chat
  className?: string
}

/**
 * Компонент сообщений
 * @namespace Features.ChatMessages
 */
export const ChatMessages = ({ chat, className = "" }: ChatMessagesProps) => {
  const { bodyRef } = useScrollMessages(chat.messages.length)

  const bodyClasses = makeClasses(
    "flex",
    "flex-col",
    "flex-1",
    "h-full",
    "pt-8",
    "pb-64",
    "overflow-y-auto",
    "scrollbar-hide",
    className
  )

  return (
    <div ref={bodyRef} className={bodyClasses}>
      <ChatNoneMessages messages={chat.messages} />
      <ChatPrevMessages messages={chat.messages} />
      <ChatLastMessages chatId={chat.id} />
    </div>
  )
}
