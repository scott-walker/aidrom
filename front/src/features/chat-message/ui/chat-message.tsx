import { MessageBubble, Roles } from "@entities/chat"
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
  return (
    <MessageBubble role={role} createdAt={createdAt} className={className}>
      <Markdown value={content} advanced html />
    </MessageBubble>
  )
}
