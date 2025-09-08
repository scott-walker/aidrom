import { makeClasses } from "@lib/style-api"
import type { Chat } from "@entities/chat/lib/types"
import { ChatInfoTrigger } from "@features/chat-info-toggle"
import { ChatListTrigger } from "@features/chat-list-toggle"
import { ChatEditableTitle } from "@features/chat-rename"

/**
 * Пропсы панели чата
 * @namespace Features.Chat.ChatPanel.ChatPanelProps
 */
type ChatPanelProps = {
  chat: Chat
}

/**
 * Панель чата
 * @namespace Features.Chat.ChatPanel
 */
export const ChatPanel = ({ chat }: ChatPanelProps) => {
  const containerClasses = makeClasses(
    "flex",
    "items-center",
    "justify-center",
    "gap-2",
    "w-fit",
    "mx-auto",
    "px-4",
    "py-2",
    "bg-background-soft",
    "rounded-bl-xl",
    "rounded-br-xl",
    "shadow-md/10"
  )

  return (
    <div className={containerClasses}>
      <ChatEditableTitle chat={chat} />

      <div className="flex items-center gap-2 ml-4">
        <ChatInfoTrigger />
        <ChatListTrigger />
      </div>
    </div>
  )
}
