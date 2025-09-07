import { NavLink } from "react-router"
import { makeClasses } from "@lib/style-api"
import { Avatar } from "@ui/avatar"
import { DateTag } from "@ui/date-tag"
import type { ChatListItem } from "../lib/types"

/**
 * Элемент списка чатов
 * @namespace Entities.Chat.UI.ChatItem
 */
export const ChatItem = ({ id, title, agent, updatedAt }: ChatListItem) => {
  const linkClasses = ({ isActive }: { isActive: boolean }) => {
    return makeClasses(
      "flex",
      "items-center",
      "px-6",
      "py-6",
      "border-b",
      "border-background-hard",
      "gap-4",
      "group",
      isActive && "bg-background-hard/40"
    )
  }

  return (
    <NavLink className={linkClasses} to={`/chat/${id}`} end>
      <Avatar initials={agent.name} />
      <div className="flex flex-col">
        <h3 className="text-foreground-hard text-lg group-hover:text-primary">{title}</h3>
        <DateTag date={updatedAt} />
      </div>
    </NavLink>
  )
}
