import type { ReactNode } from "react"
import { makeClasses } from "@lib/style-api"
import { LoaderBlock } from "@ui/loader-block"
import { ErrorBlock } from "@ui/error-block"
import { type Chat as ChatType, useChatById } from "@entities/chat"
import { ChatDialog } from "@widgets/chat-dialog"
import { ChatInfo } from "@widgets/chat-info"

/**
 * Пропсы для компонента Chat
 * @namespace Widgets.Chat.Props
 */
type ChatProps = {
  chatId: number
}

/**
 * Страница чата
 * @namespace Pages.Chat.Chat
 * @returns {ReactNode}
 */
export const Chat = ({ chatId }: ChatProps): ReactNode => {
  const { chat, isLoading, error } = useChatById(chatId)

  const containerClasses = makeClasses("flex items-stretch justify-between h-full")
  const chatClasses = makeClasses("flex-1")
  const agentClasses = makeClasses("border-l", "border-background-hard")

  return (
    <div className={containerClasses}>
      {isLoading ? (
        <LoaderBlock />
      ) : error ? (
        <ErrorBlock error={error} />
      ) : (
        <>
          <ChatDialog className={chatClasses} chat={chat as ChatType} />
          <aside className={agentClasses}>
            <ChatInfo chat={chat as ChatType} />
          </aside>
        </>
      )}
    </div>
  )
}
