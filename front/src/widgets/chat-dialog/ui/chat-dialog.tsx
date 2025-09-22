import { makeClasses } from "@lib/style-api"
import { useLayoutSubtitle } from "@lib/layout-api"
import { LoaderBlock } from "@ui/loader-block"
import { useChatById, type Chat } from "@entities/chat"
import { ChatDialogHeader } from "./chat-dialog-header"
import { ChatDialogInput } from "./chat-dialog-input"
import { ChatDialogBody } from "./chat-dialog-body"

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

  if (isLoading) return <LoaderBlock />

  return (
    <div className={containerClasses}>
      <ChatDialogHeader chat={chat as Chat} />
      <ChatDialogBody chat={chat as Chat} />
      <ChatDialogInput chat={chat as Chat} />
    </div>
  )
}
