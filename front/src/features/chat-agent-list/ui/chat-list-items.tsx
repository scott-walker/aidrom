import { NavLink } from "react-router"
import { makeClasses } from "@lib/style-api"
import type { ChatListItem } from "@entities/chat"
import { ChatCreateRegularButton } from "@features/chat-create"

/**
 * Пропсы списка чатов
 * @namespace Features.ChatAgentList.UI.ChatListItemsProps
 */
type ChatListItemsProps = {
  agentId: number
  chats: ChatListItem[]
  className?: string
}

/**
 * Список чатов
 * @namespace Features.ChatAgentList.UI.ChatListItems
 */
export const ChatListItems = ({ agentId, chats, className = "" }: ChatListItemsProps) => {
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
      <ChatCreateRegularButton agentId={agentId} />

      {chats.map(chat => (
        <NavLink to={`/chat/${chat.id}`} className={linkClasses} key={chat.id}>
          {chat.title}
        </NavLink>
      ))}
    </div>
  )
}
