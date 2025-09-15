import { NavLink } from "react-router"
import { makeClasses } from "@lib/style-api"
import { ChatCard, type ChatListItem } from "@entities/chat"
import { useToggleChatList } from "@features/chat-list-toggle"

/**
 * Пропсы для компонента
 * @namespace Widgets.ChatList.ChatListItems.Props
 */
type ChatListItemsProps = {
  chats: ChatListItem[]
}

/**
 * Элементы списка чатов
 * @namespace Widgets.ChatList
 */
export const ChatListItems = ({ chats }: ChatListItemsProps) => {
  const { isVisible } = useToggleChatList()
  const containerClasses = makeClasses("flex", "flex-col", "overflow-y-auto", "scrollbar-hide", !isVisible && "hidden")
  const linkClasses = ({ isActive }: { isActive: boolean }) => makeClasses(isActive && "bg-background-hard/50")

  return (
    <div className={containerClasses}>
      {chats.map(chat => (
        <NavLink key={chat.id} to={`/chat/${chat.id}`} className={linkClasses}>
          <ChatCard chat={chat as ChatListItem} />
        </NavLink>
      ))}
    </div>
  )
}
