import type { ReactNode } from "react"
import { makeClasses } from "@lib/style-api"
import { Loader } from "@ui/loader"
import { Notification } from "@ui/notification"
import { useChatById } from "@entities/chat/api/chat-queries"
import type { Chat as ChatType } from "@entities/chat/lib/types"
import { type Agent, AgentInfo } from "@entities/agent"
import { ChatDialog } from "@widgets/chat-dialog"

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
  const notificationClasses = makeClasses("flex-1", "justify-center")
  const agentClasses = makeClasses(
    "flex",
    "flex-col",
    "pt-(--layout-inner-offset-y)",
    "w-[300px]",
    "border-l",
    "border-background-hard",
    "bg-background-soft"
  )
  const agent = chat?.agent as Agent

  return (
    <div className={containerClasses}>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Notification className={notificationClasses} type="error">
          {error.message}
        </Notification>
      ) : (
        <>
          <ChatDialog className={chatClasses} chat={chat as ChatType} />
          <aside className={agentClasses}>
            <AgentInfo agent={agent} />
          </aside>
        </>
      )}
    </div>
  )
}
