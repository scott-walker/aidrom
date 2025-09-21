import { NavLink } from "react-router"
import { makeClasses } from "@lib/style-api"
import type { ChatListItem } from "@entities/chat"

/**
 * Пропсы списка чатов
 * @namespace Features.ChatAgentList.UI.ChatListItemsProps
 */
type ChatListItemsProps = {
  chats: ChatListItem[]
  className?: string
}

/**
 * Список чатов
 * @namespace Features.ChatAgentList.UI.ChatListItems
 */
export const ChatListItems = ({ chats, className = "" }: ChatListItemsProps) => {
  const containerClasses = makeClasses(
    "flex",
    "flex-col",
    "items-center",
    "w-full",
    "rounded-bl-xl",
    "rounded-br-xl",
    "py-2",
    className
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
      "min-w-0",
      "text-base",
      "text-foreground-hard",
      "select-none",
      "transition-colors",
      "duration-200",
      isActive && "font-bold",
      isActive && "cursor-default",
      !isActive && "hover:bg-background/50",
      !isActive && "hover:text-foreground-hard"
    )
  }

  return (
    <div className={containerClasses}>
      {chats.map(chat => (
        <NavLink to={`/chat/${chat.id}`} className={linkClasses} key={chat.id}>
          <span className="truncate w-full text-left" title={chat.title}>
            {chat.title}
          </span>
        </NavLink>
      ))}
    </div>
  )
}
