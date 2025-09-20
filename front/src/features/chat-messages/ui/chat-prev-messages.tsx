import { type Message } from "@entities/chat"
import { ChatMessage } from "@features/chat-message"
import type { ReactNode } from "react"

/**
 * Пропсы компонента предыдущих сообщений
 * @namespace Features.ChatPrevMessages.Props
 */
type ChatPrevMessagesProps = {
  messages: Message[]
}

/**
 * Компонент предыдущих сообщений
 * @namespace Features.ChatPrevMessages
 */
export const ChatPrevMessages = ({ messages }: ChatPrevMessagesProps): ReactNode => {
  return (
    <>
      {messages.map(message => (
        <ChatMessage key={message.id} {...message} />
      ))}
    </>
  )
}
