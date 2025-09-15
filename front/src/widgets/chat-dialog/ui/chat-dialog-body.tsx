import { makeClasses } from "@lib/style-api"
import type { Chat } from "@entities/chat"
import { MessageBubble, useChatStore, ChatPending, Roles } from "@entities/chat"
import { MessageEmptyList } from "@entities/chat"
import { useScrollBody } from "../lib/use-scroll-body"

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
  const { isPending, lastClientMessage } = useChatStore()
  const messages = lastClientMessage ? [...chat.messages, lastClientMessage] : chat.messages
  const isEmpty = !messages.length

  const { bodyRef } = useScrollBody(messages.length, isPending)

  if (isEmpty) {
    return <MessageEmptyList className="-mt-16" />
  }

  const bodyClasses = makeClasses("flex flex-col flex-1 pt-8 pb-64 overflow-y-auto scrollbar-hide", className)
  const makeMessageClasses = (role: Roles) => {
    return makeClasses(role === Roles.Agent && "items-start", role === Roles.Client && "items-end")
  }

  return (
    <div ref={bodyRef} className={bodyClasses}>
      {messages.map(message => (
        <MessageBubble key={message.id} {...message} className={makeMessageClasses(message.role)} />
      ))}
      {isPending && <ChatPending />}
    </div>
  )
}
