import type { ReactNode } from "react"
import { makeClasses } from "@lib/style-api"
import { ChatList } from "@widgets/chat-list/ui/chat-list"

/**
 * Пропсы компонента макета чата
 * @namespace Widgets.Chat.ChatLayoutProps
 */
type ChatLayoutProps = {
  children: ReactNode
}

/**
 * Макет чата
 * @namespace Widgets.Chat.ChatLayout
 */
export const ChatLayout = ({ children }: ChatLayoutProps) => {
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
