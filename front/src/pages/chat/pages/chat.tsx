import type { ReactNode } from "react"
import { useParams } from "react-router"
import { makeClasses } from "@lib/style-api"
import { ChatDialog } from "@widgets/chat-dialog"
import { ChatInfo } from "@widgets/chat-info"

/**
 * Страница чата
 * @namespace Pages.Chat.Chat
 * @returns {ReactNode}
 */
export const Chat = (): ReactNode => {
  const chatId = parseInt(useParams().chatId as string)

  const containerClasses = makeClasses("flex items-stretch justify-between h-full")
  const chatClasses = makeClasses("flex-1")
  const agentClasses = makeClasses("border-l", "border-background-hard")

  return (
    <div className={containerClasses}>
      <ChatDialog className={chatClasses} chatId={chatId} />
      <aside className={agentClasses}>
        <ChatInfo chatId={chatId} />
      </aside>
    </div>
  )
}
