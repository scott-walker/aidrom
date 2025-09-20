import { type ReactNode } from "react"
import { useChatMessages, useChatStore, ChatPending } from "@entities/chat"
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
  const isPending = useChatStore(state => state.isPending)
  const { messagesEndRef } = useScrollMessages(messages.length)

  return (
    <>
      {messages.map(message => (
        <ChatMessage key={message.id} {...message} />
      ))}
      {isPending && <ChatPending />}
      <div ref={messagesEndRef} />
    </>
  )
}
