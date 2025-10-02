import { makeClasses } from "@lib/style-api"
import { useLayoutSubtitle } from "@lib/layout-api"
import { LoaderBlock } from "@ui/loader-block"

import { useChatById, useChatMessages } from "@entities/chat"
import { ChatMessages } from "@features/chat-messages"

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
  const { chat, isLoading: isChatLoading } = useChatById(chatId)
  const { messages, isLoading: isMessagesLoading } = useChatMessages(chatId)

  useLayoutSubtitle(chat?.title || "")

  if (isChatLoading || isMessagesLoading) return <LoaderBlock />
  if (!chat) return null

  const containerClasses = makeClasses("relative flex flex-col w-full h-full", className)
  const contentClasses = makeClasses("relative", "w-full", "h-full")
  const fogClasses = makeClasses(
    "absolute",
    "z-10",
    "inset-0",
    "pointer-events-none",
    "bg-background",
    "animate-[fade-out_ease-in-out_0.5s_1_0.15s_forwards]"
  )

  return (
    <div className={containerClasses}>
      <ChatDialogHeader chat={chat} />

      <div className={contentClasses}>
        <div key={chatId} className={fogClasses} />
        <ChatMessages chatId={chatId} messages={messages} />
      </div>

      <ChatDialogInput chatId={chatId} />
    </div>
  )
}
