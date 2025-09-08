import { makeClasses } from "@lib/style-api"
import type { Chat } from "@entities/chat"
import { ChatDialogHeader } from "./chat-dialog-header"
import { ChatDialogInput } from "./chat-dialog-input"
import { ChatDialogBody } from "./chat-dialog-body"

/**
 * Пропсы диалога чата
 * @namespace Widgets.Chat.ChatProps
 */
type ChatDialogProps = {
  chat: Chat
}

/**
 * Диалог чата
 * @namespace Widgets.Chat
 */
export const ChatDialog = ({ chat }: ChatDialogProps) => {
  const containerClasses = makeClasses("relative flex flex-col px-8 w-full h-full")

  return (
    <div className={containerClasses}>
      <ChatDialogHeader chat={chat} />
      <ChatDialogBody chat={chat} />
      <ChatDialogInput chat={chat} />
    </div>
  )
}
