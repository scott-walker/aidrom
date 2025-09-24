import { makeClasses } from "@lib/style-api"
import { useLayoutSubtitle } from "@lib/layout-api"
import { LoaderBlock } from "@ui/loader-block"

import { useChatById } from "@entities/chat"

import { ChatMessages } from "@features/chat-messages"
import { ChatScroller } from "@features/chat-scroller"
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

  console.log("ChatDialog")

  useLayoutSubtitle(chat?.title || "")

  if (isLoading || !chat) return <LoaderBlock />

  return (
    <div className={containerClasses}>
      <ChatDialogHeader chat={chat} />
      <ChatMessages messages={chat.messages} />
      <ChatPending />
      {/* <ChatScroller chatId={chatId} /> */}
      <ChatDialogInput chatId={chatId} />
    </div>
  )
}
