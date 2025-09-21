import { type ReactNode } from "react"
import { useChatMessages } from "@entities/chat"
import { ChatMessage } from "@features/chat-message"

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

  return (
    <>
      {messages.map(message => (
        <ChatMessage key={message.id} {...message} />
      ))}
    </>
  )
}
