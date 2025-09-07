import { makeClasses } from "@lib/style-api"
import { Loader } from "@ui/loader"
import { Notification } from "@ui/notification"
import { MessageList } from "@entities/chat/ui/message-list"
import { useChatById } from "@entities/chat/api/chat-queries"
import { InputSection } from "./ui/input-section"
import type { Chat as ChatType } from "@entities/chat/lib/types"

/**
 * Пропсы чата
 * @namespace Widgets.Chat.ChatProps
 */
type ChatProps = {
  chatId: number
}

/**
 * Стуктура чата
 * @namespace Widgets.Chat
 */
export const Chat = ({ chatId }: ChatProps) => {
  const { chat, isLoading, error } = useChatById(chatId)

  if (isLoading) return <Loader />
  if (error) return <Notification type="error">{error.message}</Notification>

  const containerClasses = makeClasses("flex flex-col h-full")
  // const headerClasses = makeClasses("flex flex-col gap-2 p-4 bg-background-soft")
  const bodyClasses = makeClasses("flex flex-col flex-1 p-4 overflow-y-auto scrollbar-hide")
  const inputClasses = makeClasses("flex flex-col gap-2 bg-background-soft rounded-2xl")

  return (
    <div className={containerClasses}>
      {/* <div className={headerClasses}>{(chat as ChatType).title}</div> */}
      <div className={bodyClasses}>
        <MessageList messages={(chat as ChatType).messages} />
      </div>
      <div className={inputClasses}>
        <InputSection />
      </div>
    </div>
  )
}
