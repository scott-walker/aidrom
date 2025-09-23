import { makeClasses } from "@lib/style-api"
import { useLayoutSubtitle } from "@lib/layout-api"
import { LoaderBlock } from "@ui/loader-block"

import { useChatById, type Chat } from "@entities/chat"

import { ChatMessages } from "@features/chat-messages"
import { ChatBody } from "@features/chat-body"
import { ChatPending } from "@features/chat-pending"

import { ChatDialogHeader } from "./chat-dialog-header"
import { ChatDialogInput } from "./chat-dialog-input"

/**
 * Пропсы диалога чата
 * @namespace Widgets.Chat.ChatProps
 */
type ChatDialogProps = {
  chatId: number
  className?: string
}

/**
 * Диалог чата
 * @namespace Widgets.Chat
 */
export const ChatDialog = ({ chatId, className = "" }: ChatDialogProps) => {
  const { chat, isLoading } = useChatById(chatId)
  const containerClasses = makeClasses("relative flex flex-col w-full h-full", className)

  useLayoutSubtitle(chat?.title || "")

  if (isLoading || !chat) return <LoaderBlock />

  return (
    <div className={containerClasses}>
      <ChatDialogHeader chat={chat} />
      <ChatBody chat={chat}>
        <ChatMessages chat={chat} />
        <ChatPending />
      </ChatBody>
      <ChatDialogInput chat={chat} />
    </div>
  )
}
