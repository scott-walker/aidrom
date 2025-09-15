import { makeClasses } from "@lib/style-api"
import { LoaderBlock } from "@ui/loader-block"
import { ErrorBlock } from "@ui/error-block"
import { useChats } from "@entities/chat/api/chat-queries"
import type { ChatListItem } from "@entities/chat"
import { useToggleChatList } from "@features/chat-list-toggle"
import { ChatListHeader } from "./chat-list-header"
import { ChatListItems } from "./chat-list-items"

/**
 * Список чатов
 * @namespace Widgets.ChatList
 */
export const ChatList = () => {
  const { isVisible } = useToggleChatList()
  const { chats, isLoading, error } = useChats()

  const containerClasses = makeClasses(
    "flex",
    "flex-col",
    "h-full",
    // isVisible
    isVisible && "w-[300px]",
    !isVisible && "w-fit"
  )

  if (isLoading) return <LoaderBlock />
  if (error) return <ErrorBlock error={error} />

  return (
    <div className={containerClasses}>
      <ChatListHeader />
      <ChatListItems chats={chats as ChatListItem[]} />
    </div>
  )
}
