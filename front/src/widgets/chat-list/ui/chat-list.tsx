import { makeClasses } from "@lib/style-api"
import { Heading } from "@ui/heading"
import { ChatListTrigger, useToggleChatList } from "@features/chat-list-toggle"
import { ChatAgentList } from "@features/chat-agent-list"

/**
 * Пропсы для компонента ChatList
 * @namespace Widgets.ChatList.UI.ChatListProps
 */
type ChatListProps = {
  className?: string
}

/**
 * Список чатов
 * @namespace Widgets.ChatList
 */
export const ChatList = ({ className = "" }: ChatListProps) => {
  const { isVisible } = useToggleChatList()
  const containerClasses = makeClasses("flex", "flex-col", "h-full", isVisible ? "w-full" : "w-fit", className)
  const headerClasses = makeClasses("flex", "justify-between", "items-center", "px-6", "py-4")
  const listClasses = makeClasses(
    "flex",
    "flex-col",
    "h-full",
    "w-full",
    "overflow-y-auto",
    "scrollbar-hide",
    !isVisible && "hidden"
  )

  return (
    <div className={containerClasses}>
      <header className={headerClasses}>
        {isVisible && <Heading level={5}>Чаты</Heading>}
        <ChatListTrigger />
      </header>
      <div className={listClasses}>
        <ChatAgentList />
      </div>
    </div>
  )
}
