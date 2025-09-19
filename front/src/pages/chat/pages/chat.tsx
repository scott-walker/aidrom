import type { ReactNode } from "react"
import { useParams } from "react-router"
import { makeClasses } from "@lib/style-api"
import { ChatDialog } from "@widgets/chat-dialog"
import { ChatInfo } from "@widgets/chat-info"
import { useToggleChatInfo } from "@features/chat-info-toggle"

/**
 * Страница чата
 * @namespace Pages.Chat.Chat
 * @returns {ReactNode}
 */
export const Chat = (): ReactNode => {
  const chatId = parseInt(useParams().chatId as string)

  const { isVisible: isChatInfoVisible } = useToggleChatInfo()

  const containerClasses = makeClasses("flex", "items-stretch", "justify-between", "h-full", "w-full")
  const chatClasses = makeClasses("flex-1", "pr-8", isChatInfoVisible ? "w-[calc(100%-350px)]" : "w-[calc(100%-90px)]")
  const asideClasses = makeClasses("border-l", "border-background-hard", isChatInfoVisible ? "w-[350px]" : "w-[90px]")

  return (
    <div className={containerClasses}>
      <ChatDialog className={chatClasses} chatId={chatId} />
      <aside className={asideClasses}>
        <ChatInfo chatId={chatId} />
      </aside>
    </div>
  )
}
