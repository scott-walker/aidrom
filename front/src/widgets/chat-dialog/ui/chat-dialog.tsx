import { makeClasses } from "@lib/style-api"
import { LoaderBlock } from "@ui/loader-block"
import { ErrorBlock } from "@ui/error-block"
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
  const { chat, isLoading, error } = useChatById(chatId)

  const containerClasses = makeClasses("relative flex flex-col px-8 w-full h-full", className)

  if (isLoading) return <LoaderBlock />
  if (error) return <ErrorBlock error={error} />

  return (
    <div className={containerClasses}>
      <ChatDialogHeader chat={chat as Chat} />
      <ChatDialogBody chat={chat as Chat} />
      <ChatDialogInput chat={chat as Chat} />
    </div>
  )
}
