import { MessageEmptyList, type Chat } from "@entities/chat"
import { ChatMessage } from "@features/chat-message"

/**
 * Пропсы компонента сообщений
 * @namespace Features.ChatMessages.Props
 */
type ChatMessagesProps = {
  chat: Chat
}

/**
 * Компонент сообщений
 * @namespace Features.ChatMessages
 */
export const ChatMessages = ({ chat }: ChatMessagesProps) => {
  console.log("ChatMessages")

  if (!chat.messages.length) return <MessageEmptyList />

  return (
    <div className="flex flex-col">
      {chat.messages.map(message => (
        <ChatMessage key={message.id} {...message} />
      ))}
    </div>
  )
}
