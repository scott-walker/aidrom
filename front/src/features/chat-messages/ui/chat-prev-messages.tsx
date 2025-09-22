import type { ReactNode } from "react"
import { type Message } from "@entities/chat"
import { ChatMessage } from "@features/chat-message"
import { useScrollMessages } from "../lib/use-scroll-messages"

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
  const { messagesStartRef } = useScrollMessages()

  return (
    <>
      <div ref={messagesStartRef} />
      {messages.map(message => (
        <ChatMessage key={message.id} {...message} />
      ))}
    </>
  )
}
