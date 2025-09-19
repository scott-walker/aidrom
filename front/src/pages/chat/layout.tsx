import type { ReactNode } from "react"
import { useTitle } from "@lib/layout-api/utils"
import { makeClasses } from "@lib/style-api"
import { ChatList } from "@widgets/chat-list"
import { useToggleChatList } from "@features/chat-list-toggle"

/**
 * Макет страницы
 * @namespace Pages.Chat.Layout
 */
export const Layout = ({ children }: { children: ReactNode }) => {
  useTitle("Чаты")

  const { isVisible: isChatListVisible } = useToggleChatList()

  const containerClasses = makeClasses("flex items-stretch justify-between h-full")
  const asideClasses = makeClasses(
    "h-full",
    // "border-r",
    // "border-background-hard",
    isChatListVisible ? "w-[350px]" : "w-[90px]"
  )
  const chatClasses = makeClasses(
    "flex-1",
    "w-full",
    isChatListVisible ? "w-[calc(100%-350px)]" : "w-[calc(100%-90px)]"
  )

  return (
    <div className={containerClasses}>
      <aside className={asideClasses}>
        <ChatList />
      </aside>
      <div className={chatClasses}>{children}</div>
    </div>
  )
}
