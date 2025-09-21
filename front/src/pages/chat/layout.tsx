import type { ReactNode } from "react"
// import { useLayoutTitle } from "@lib/layout-api"
import { makeClasses } from "@lib/style-api"
import { ChatList } from "@widgets/chat-list"
import { useChatListToggleStore } from "@features/chat-list-toggle"
import { useChatInfoToggleStore } from "@features/chat-info-toggle"

/**
 * Пропсы макета
 * @namespace Pages.Chat.Layout.Props
 */
type LayoutProps = {
  children: ReactNode
  infobar?: ReactNode
}

/**
 * Макет страницы
 * @namespace Pages.Chat.Layout
 */
export const Layout = ({ children, infobar }: LayoutProps) => {
  // useLayoutTitle().setTitle("Чаты")

  const isChatListVisible = useChatListToggleStore(state => state.isVisible)
  const isChatInfoVisible = useChatInfoToggleStore(state => state.isVisible)

  const containerClasses = makeClasses("flex items-stretch justify-between h-full")
  const listbarClasses = makeClasses("h-full", isChatListVisible ? "w-[350px]" : "w-[90px]")
  const infobarClasses = makeClasses("h-full", isChatInfoVisible ? "w-[350px]" : "w-[90px]")
  const chatClasses = makeClasses(
    "flex-1",
    !!infobar && "pr-8",
    isChatInfoVisible && isChatListVisible && "w-[calc(100%-640px)]",
    !isChatInfoVisible && !isChatListVisible && "w-[calc(100%-180px)]",
    isChatInfoVisible && !isChatListVisible && "w-[calc(100%-440px)]",
    !isChatInfoVisible && isChatListVisible && "w-[calc(100%-440px)]"
  )

  return (
    <div className={containerClasses}>
      <aside className={listbarClasses}>
        <ChatList />
      </aside>
      <div className={chatClasses}>{children}</div>
      {infobar && <aside className={infobarClasses}>{infobar}</aside>}
    </div>
  )
}
