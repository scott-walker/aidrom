import { useEffect, type ReactNode } from "react"
import { useChatMessages } from "@entities/chat"
import { ChatMessage } from "@features/chat-message"
import { useScrollMessages } from "../lib/use-scroll-messages"

/**
 * Пропсы компонента последних сообщений
 * @namespace Features.ChatLastMessages.Props
 */
type ChatLastMessagesProps = {
  chatId: number
}

/**
 * Компонент последних сообщений
 * @namespace Features.ChatLastMessages
 */
export const ChatLastMessages = ({ chatId }: ChatLastMessagesProps): ReactNode => {
  const messages = useChatMessages(chatId)
  const { messagesEndRef, scrollToBottom } = useScrollMessages()

  useEffect(() => scrollToBottom("instant"), [chatId])
  useEffect(() => scrollToBottom("smooth"), [messages.length])

  return (
    <>
      {messages.map(message => (
        <ChatMessage key={message.id} {...message} />
      ))}
      <div ref={messagesEndRef} />
    </>
  )
}
