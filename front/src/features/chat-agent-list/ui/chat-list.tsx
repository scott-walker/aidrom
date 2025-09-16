import { NavLink } from "react-router"
import { makeClasses } from "@lib/style-api"
import { Icon } from "@ui/icon"
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
  const containerClasses = makeClasses(
    "flex",
    "flex-col",
    "items-center",
    "w-full",
    "bg-background-soft",
    "rounded-bl-xl",
    "rounded-br-xl",
    "py-2",
    className
  )
  const createChatLinkClasses = makeClasses(
    "flex",
    "items-center",
    "justify-center",
    "gap-1",
    "px-3",
    "py-1",
    "my-2",
    "w-fit",
    "text-sm",
    "font-bold",
    "bg-primary",
    "text-primary-foreground",
    "hover:bg-primary-accent",
    "hover:text-primary-foreground-accent",
    "select-none",
    "rounded-2xl"
  )
  const linkClasses = ({ isActive }: { isActive: boolean }) => {
    return makeClasses(
      "flex",
      "items-center",
      "justify-start",
      "gap-2",
      "px-6",
      "py-1",
      "w-full",
      "text-base",
      "text-foreground-hard",
      isActive && "font-bold",
      "hover:bg-background/50",
      "hover:text-foreground-hard",
      "select-none"
    )
  }

  return (
    <div className={containerClasses}>
      <a href="/chat/new" className={createChatLinkClasses}>
        <Icon name="plus" size={20} strokeWidth={2} /> Создать чат
      </a>
      {chats.map(chat => (
        <NavLink to={`/chat/${chat.id}`} className={linkClasses} key={chat.id}>
          {chat.title}
        </NavLink>
      ))}
    </div>
  )
}
