import { makeClasses } from "@lib/style-api"
import { type Chat, type Role, Roles } from "@entities/chat/lib/types"
import { MessageBubble } from "@entities/chat"
import { MessageEmptyList } from "@entities/chat"

/**
 * Пропсы компонента тела диалога
 * @namespace Widgets.Chat.ChatProps
 */
type ChatDialogBodyProps = {
  chat: Chat
  className?: string
}

/**
 * Тело диалога чата
 * @namespace Widgets.Chat
 */
export const ChatDialogBody = ({ chat, className = "" }: ChatDialogBodyProps) => {
  const { messages = [] } = chat
  const isEmpty = !messages.length

  const bodyClasses = makeClasses("flex flex-col flex-1 py-8 overflow-y-auto scrollbar-hide", className)
  const makeMessageClasses = (role: Role) => {
    return makeClasses(role === Roles.Agent && "items-start", role === Roles.Client && "items-end")
  }

  return (
    <div className={bodyClasses}>
      {isEmpty && <MessageEmptyList />}
      {!isEmpty &&
        messages.map(message => (
          <MessageBubble key={message.id} {...message} className={makeMessageClasses(message.role)} />
        ))}
    </div>
  )
}
