import { makeClasses } from "@lib/style-api"
import { ChatItem } from "./chat-item"
import type { ChatListItem } from "../lib/types"

/**
 * Список чатов
 * @namespace Entities.Chat.UI.ChatList
 */
export const ChatList = ({ chats }: { chats: ChatListItem[] }) => {
  const classes = makeClasses("flex flex-col")

  return (
    <div className={classes}>
      {chats.map(chat => (
        <ChatItem key={chat.id} {...chat} />
      ))}
    </div>
  )
}
