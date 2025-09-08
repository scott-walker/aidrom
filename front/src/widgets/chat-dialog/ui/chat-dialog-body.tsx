import { useEffect, useRef } from "react"
import { makeClasses } from "@lib/style-api"
import type { Chat, Role } from "@entities/chat"
import { MessageBubble, useChatStore, ChatPending, Roles } from "@entities/chat"
import { MessageEmptyList } from "@entities/chat"

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
  const { messages = [] } = chat
  const bodyRef = useRef<HTMLDivElement>(null)

  // Объединяем реальные сообщения с оптимистичным
  const allMessages = lastClientMessage ? [...messages, lastClientMessage] : messages
  const isEmpty = !allMessages.length

  // Прокрутка до конца при изменении сообщений или состояния pending
  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight
    }
  }, [allMessages.length, isPending])

  if (isEmpty) {
    return <MessageEmptyList />
  }

  const bodyClasses = makeClasses("flex flex-col flex-1 pt-8 pb-64 overflow-y-auto scrollbar-hide", className)
  const makeMessageClasses = (role: Role) => {
    return makeClasses(role === Roles.Agent && "items-start", role === Roles.Client && "items-end")
  }

  return (
    <div ref={bodyRef} className={bodyClasses}>
      {allMessages.map(message => (
        <MessageBubble key={message.id} {...message} className={makeMessageClasses(message.role)} />
      ))}
      {isPending && <ChatPending />}
    </div>
  )
}
