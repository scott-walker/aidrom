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
    "w-full",
    "bg-background-soft/70",
    "border-b",
    "border-background-hard/70",
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
      "text-base",
      "text-foreground-hard",
      "font-normal",
      isActive && "text-primary",
      isActive && "font-bold",
      "hover:text-primary",
      "select-none"
    )
  }

  return (
    <div className={containerClasses}>
      {chats.map(chat => (
        <NavLink to={`/chat/${chat.id}`} className={linkClasses} key={chat.id}>
          {({ isActive }) => {
            return (
              <>
                {isActive && <Icon name="chevron-right" size={20} strokeWidth={2} />}
                {chat.title}
              </>
            )
          }}
        </NavLink>
      ))}
    </div>
  )
}
