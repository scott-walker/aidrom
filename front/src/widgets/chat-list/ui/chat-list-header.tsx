import { makeClasses } from "@lib/style-api"
import { Heading } from "@shared/ui/heading"
import { useToggleChatList, ChatListTrigger } from "@features/chat-list-toggle"

/**
 * Заголовок списка чатов
 * @namespace Widgets.ChatList.ChatListHeader
 */
export const ChatListHeader = () => {
  const { isVisible } = useToggleChatList()
  const headerClasses = makeClasses("flex", "justify-between", "items-center", "px-6", "py-4")

  return (
    <header className={headerClasses}>
      {isVisible && <Heading level={5}>Чаты</Heading>}
      <ChatListTrigger />
    </header>
  )
}
