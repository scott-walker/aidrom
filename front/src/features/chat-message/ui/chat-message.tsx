import { type CSSProperties, type Ref } from "react"
import { MessageBubble, Roles } from "@entities/chat"
import { makeClasses } from "@shared/lib/style-api"
import { Markdown } from "@ui/markdown"

/**
 * Пропсы компонента сообщения чата
 * @namespace Features.ChatMessage.UI.ChatMessage.Props
 */
type ChatMessageProps = {
  id: string
  content: string
  role: Roles
  createdAt: Date
  className?: string
  style?: CSSProperties
  ref?: Ref<HTMLDivElement>
}

/**
 * Компонент сообщения чата
 * @namespace Features.ChatMessage.UI.ChatMessage
 */
export const ChatMessage = ({ id, content, role, createdAt, className = "", style = {}, ref }: ChatMessageProps) => {
  const makeMessageClasses = (role: Roles) => {
    return makeClasses(role === Roles.Agent && "items-start", role === Roles.Client && "items-end", className)
  }

  // useEffect(() => {
  //   console.log("ChatMessage mount", id)

  //   return () => {
  //     console.log("ChatMessage unmount", id)
  //   }
  // }, [id])

  const normalizedContent = role === Roles.Agent ? <Markdown value={content} /> : <p>{content}</p>

  return (
    <MessageBubble
      ref={ref}
      id={id}
      role={role}
      createdAt={createdAt}
      className={makeMessageClasses(role)}
      style={style}
    >
      {normalizedContent}
    </MessageBubble>
  )
}
