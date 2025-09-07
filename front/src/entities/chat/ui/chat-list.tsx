import { makeClasses } from "@lib/style-api"
import { ChatItem } from "./chat-item"
import type { Chat } from "../lib/types"

/**
 * Список чатов
 * @namespace Entities.Chat.UI.ChatList
 */
export const ChatList = ({ chats }: { chats: Chat[] }) => {
  const classes = makeClasses("flex flex-col")

  return (
    <div className={classes}>
      {chats.map(chat => (
        <ChatItem key={chat.id} {...chat} />
      ))}
    </div>
  )
}
