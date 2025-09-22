import { MessageBubble, Roles } from "@entities/chat"
import { makeClasses } from "@shared/lib/style-api"
import { Markdown } from "@ui/markdown"

/**
 * Пропсы компонента сообщения чата
 * @namespace Features.ChatMessage.UI.ChatMessage.Props
 */
type ChatMessageProps = {
  content: string
  role: Roles
  createdAt: Date
  className?: string
}

/**
 * Компонент сообщения чата
 * @namespace Features.ChatMessage.UI.ChatMessage
 */
export const ChatMessage = ({ content, role, createdAt, className = "" }: ChatMessageProps) => {
  const makeMessageClasses = (role: Roles) => {
    return makeClasses(role === Roles.Agent && "items-start", role === Roles.Client && "items-end", className)
  }

  const normalizedContent = role === Roles.Agent ? <Markdown value={content} /> : <p>{content}</p>

  return (
    <MessageBubble role={role} createdAt={createdAt} className={makeMessageClasses(role)}>
      {normalizedContent}
    </MessageBubble>
  )
}
