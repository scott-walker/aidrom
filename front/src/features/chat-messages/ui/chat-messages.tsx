import { makeClasses } from "@lib/style-api"
import { MessageEmptyList, type Chat } from "@entities/chat"
import { ChatPending } from "./chat-pending"
import { ChatMessage } from "@features/chat-message"
import { useScrollMessages } from "../lib/use-scroll-messages"
import { useEffect } from "react"

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
  const { messagesStartRef, messagesEndRef, scrollToBottom } = useScrollMessages()

  useEffect(() => scrollToBottom("instant"), [scrollToBottom, chat.id])
  useEffect(() => scrollToBottom("smooth"), [scrollToBottom, chat.messages.length])

  if (!chat.messages.length) {
    return <MessageEmptyList />
  }

  const bodyClasses = makeClasses(
    "flex-1",
    "flex",
    "flex-col",
    "h-full",
    "pt-8",
    "pb-64",
    "overflow-y-auto",
    "scrollbar-hide",
    className
  )

  return (
    <div className={bodyClasses}>
      <div ref={messagesStartRef} />
      {chat.messages.map(message => (
        <ChatMessage key={message.id} {...message} />
      ))}
      <ChatPending />
      <div ref={messagesEndRef} />
    </div>
  )
}
