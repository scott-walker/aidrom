import { makeClasses } from "@lib/style-api"
import { Heading } from "@ui/heading"
import { ChatListTrigger, useChatListToggleStore } from "@features/chat-list-toggle"
import { LISBAR_CONTAINER_CLASS } from "../lib/constants"

/**
 * Пропсы для компонента ChatList
 * @namespace Features.ChatInterface.UI.ChatListBarProps
 */
interface ChatListBarProps {
  className?: string
}

/**
 * Список чатов
 * @namespace Features.ChatInterface.UI.ChatListBar
 */
export const ChatListBar = ({ className = "" }: ChatListBarProps) => {
  const isVisible = useChatListToggleStore(state => state.isVisible)
  const containerClasses = makeClasses("flex", "flex-col", "h-full", className)
  const headerClasses = makeClasses("flex", "justify-between", "items-center", "px-(--layout-inner-offset-x)", "py-4")
  const listClasses = makeClasses(
    "flex-1",
    "flex",
    "flex-col",
    "w-full",
    "overflow-y-auto",
    "scrollbar-hide",
    !isVisible && "hidden",
    LISBAR_CONTAINER_CLASS
  )

  return (
    <aside className={containerClasses}>
      <header className={headerClasses}>
        {isVisible && <Heading level={5}>Чаты</Heading>}
        <ChatListTrigger />
      </header>
      <div className={listClasses} />
    </aside>
  )
}
