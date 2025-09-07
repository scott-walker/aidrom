import type { ReactNode } from "react"
import { makeClasses } from "@lib/style-api"
import { useTitle } from "@lib/layout-api/utils"
import { AgentList } from "@widgets/agent-list"
import { ChatList } from "@widgets/chat-list"

/**
 * Макет страницы
 * @namespace Pages.Chat.Layout
 */
export const Layout = ({ children }: { children: ReactNode }) => {
  useTitle("Чат")

  const containerClasses = makeClasses("flex items-stretch justify-between gap-4 h-full")
  const chatListClasses = makeClasses("flex flex-col w-2/12")
  const chatClasses = makeClasses("flex-1 flex flex-col")
  const agentListClasses = makeClasses("flex flex-col w-2/12")

  return (
    <div className={containerClasses}>
      <aside className={chatListClasses}>
        <ChatList />
      </aside>
      <div className={chatClasses}>{children}</div>
      <aside className={agentListClasses}>
        <AgentList />
      </aside>
    </div>
  )
}
