import { NavLink } from "react-router"
import { makeClasses } from "@lib/style-api"
import type { Chat } from "../lib/types"

/**
 * Элемент списка чатов
 * @namespace Entities.Chat.UI.ChatItem
 */
export const ChatItem = ({ id, title }: Chat) => {
  const classes = makeClasses("py-4 text-foreground-soft/50")
  const linkClasses = ({ isActive }: { isActive: boolean }) => {
    return makeClasses("hover:text-primary", isActive && "text-primary")
  }

  return (
    <div className={classes}>
      <NavLink className={linkClasses} to={`/chat/${id}`} end>
        {title}
      </NavLink>
    </div>
  )
}
