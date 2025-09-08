import { makeClasses } from "@lib/style-api"
import { ChatItem } from "./chat-item"
import type { ChatListItem } from "../lib/types"

/**
 * Пропсы для компонента ChatList
 * @namespace Entities.Chat.UI.ChatList.Props
 */
type ChatListProps = {
  chats: ChatListItem[]
  className?: string
}

/**
 * Список чатов
 * @namespace Entities.Chat.UI.ChatList
 */
export const ChatList = ({ chats, className = "" }: ChatListProps) => {
  const containerClasses = makeClasses("flex flex-col", className)

  return (
    <div className={containerClasses}>
      {chats.map(chat => (
        <ChatItem key={chat.id} {...chat} />
      ))}
    </div>
  )
}
