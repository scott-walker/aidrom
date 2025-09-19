import { makeClasses } from "@lib/style-api"
import { type Chat, useChatStore, ChatPending, Roles, MessageEmptyList } from "@entities/chat"
import { useScrollBody } from "../lib/use-scroll-body"
import { ChatMessage } from "@features/chat-message"

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
  const { isPending, lastClientMessage, lastAgentMessage } = useChatStore()

  let messages = chat.messages
  messages = lastClientMessage ? [...messages, lastClientMessage] : messages
  messages = lastAgentMessage ? [...messages, lastAgentMessage] : messages

  const { bodyRef } = useScrollBody(messages.length, isPending)
  const isEmpty = !messages.length

  if (isEmpty) {
    return <MessageEmptyList className="-mt-16" />
  }

  const bodyClasses = makeClasses(
    "flex",
    "flex-col",
    "flex-1",
    "pt-8",
    "pb-64",
    "overflow-y-auto",
    "scrollbar-hide",
    className
  )
  const makeMessageClasses = (role: Roles) => {
    return makeClasses(role === Roles.Agent && "items-start", role === Roles.Client && "items-end")
  }

  return (
    <div ref={bodyRef} className={bodyClasses}>
      {messages.map(message => (
        <ChatMessage key={message.id} {...message} className={makeMessageClasses(message.role)} />
      ))}
      {isPending && <ChatPending />}
    </div>
  )
}
