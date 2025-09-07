import { makeClasses } from "@lib/style-api"
import { Loader } from "@ui/loader"
import { Notification } from "@ui/notification"
import { ChatList as ChatListComponent } from "@entities/chat/ui/chat-list"
import { useChats } from "@entities/chat/api/chat-queries"
import { Heading } from "@shared/ui/heading"

/**
 * Список чатов
 * @namespace Widgets.ChatList
 */
export const ChatList = () => {
  const classes = makeClasses("flex flex-col")
  const { chats, isLoading, error } = useChats()

  if (isLoading) return <Loader />
  if (error) return <Notification type="error">{error.message}</Notification>

  return (
    <div className={classes}>
      <header className="px-(--layout-inner-offset-x) pt-(--layout-inner-offset-y) pb-4">
        <Heading level={5}>Чаты</Heading>
      </header>
      <ChatListComponent chats={chats} />
    </div>
  )
}
