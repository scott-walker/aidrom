import { NavLink } from "react-router"
import { makeClasses } from "@lib/style-api"
import type { ChatListItem } from "@entities/chat"

/**
 * Пропсы списка чатов
 * @namespace Features.ChatAgentList.UI.ChatListProps
 */
type ChatListProps = {
  chats: ChatListItem[]
  className?: string
}

/**
 * Список чатов
 * @namespace Features.ChatAgentList.UI.ChatList
 */
export const ChatList = ({ chats, className = "" }: ChatListProps) => {
  const containerClasses = makeClasses("flex", "flex-col", "w-full", className)
  const linkClasses = ({ isActive }: { isActive: boolean }) => {
    return makeClasses(
      "flex",
      "items-center",
      "justify-start",
      "gap-4",
      "px-4",
      "py-2",
      "w-full",
      "text-base",
      "font-semibold",
      "border-b",
      "border-background-hard",
      isActive && "text-primary",
      "hover:text-primary"
    )
  }

  return (
    <div className={containerClasses}>
      {chats.map(chat => (
        <NavLink to={`/chat/${chat.id}`} className={linkClasses}>
          {chat.title}
        </NavLink>
      ))}
    </div>
  )
}
