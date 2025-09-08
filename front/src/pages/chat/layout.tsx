import type { ReactNode } from "react"
import { makeClasses } from "@lib/style-api"
import { useTitle } from "@lib/layout-api/utils"
import { ChatList } from "@widgets/chat-list"

/**
 * Макет страницы
 * @namespace Pages.Chat.Layout
 */
export const Layout = ({ children }: { children: ReactNode }) => {
  useTitle("Чат")

  const containerClasses = makeClasses("flex items-stretch justify-between h-full")
  const chatListClasses = makeClasses("flex", "flex-col", "w-fit", "border-r", "border-background-hard")
  const chatClasses = makeClasses("flex-1 flex flex-col w-full")

  return (
    <div className={containerClasses}>
      <aside className={chatListClasses}>
        <ChatList />
      </aside>
      <div className={chatClasses}>{children}</div>
    </div>
  )
}
