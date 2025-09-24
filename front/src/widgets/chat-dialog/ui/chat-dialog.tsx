import { makeClasses } from "@lib/style-api"
import { useLayoutSubtitle } from "@lib/layout-api"
import { LoaderBlock } from "@ui/loader-block"

import { useChatById, useChatMessages } from "@entities/chat"

import { ChatMessages } from "@features/chat-messages"
import { ChatPending } from "@features/chat-pending"
import { ChatScroller } from "@features/chat-scroller"

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
  console.log("ChatDialog")

  const { chat, isLoading: isChatLoading } = useChatById(chatId)
  const { messages, isLoading: isMessagesLoading } = useChatMessages(chatId)

  useLayoutSubtitle(chat?.title || "")

  if (isChatLoading || isMessagesLoading) return <LoaderBlock />
  if (!chat) return null

  const containerClasses = makeClasses("relative flex flex-col w-full h-full", className)

  return (
    <div className={containerClasses}>
      <ChatDialogHeader chat={chat} />
      <ChatMessages chatId={chatId} messages={messages}>
        <ChatPending />
        {/* <ChatScroller chatId={chatId} /> */}
      </ChatMessages>
      <ChatDialogInput chatId={chatId} />
    </div>
  )
}
