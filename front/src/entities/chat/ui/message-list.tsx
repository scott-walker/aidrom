import { makeClasses } from "@lib/style-api"
import { MessageItem } from "./message-item"
import type { Message } from "../lib/types"

/**
 * Список сообщений
 * @namespace Entities.Chat.UI.MessageList
 */
export const MessageList = ({ messages }: { messages: Message[] }) => {
  const classes = makeClasses("flex flex-col gap-8")

  return (
    <div className={classes}>
      {messages.map(message => (
        <MessageItem key={message.id} {...message} />
      ))}
    </div>
  )
}
