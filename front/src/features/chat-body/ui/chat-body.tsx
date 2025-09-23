import { useEffect, type ReactNode } from "react"
import { makeClasses } from "@lib/style-api"
import { Chat } from "@entities/chat"
import { useScrollBody } from "../lib/use-scroll-body"

/**
 * Пропсы компонента сообщений
 * @namespace Features.ChatBody.Props
 */
type ChatBodyProps = {
  chat: Chat
  children: ReactNode
  className?: string
}

/**
 * Компонент сообщений
 * @namespace Features.ChatBody
 */
export const ChatBody = ({ chat, children, className = "" }: ChatBodyProps) => {
  const { bodyStartRef, bodyEndRef, scrollToBottom } = useScrollBody()

  useEffect(() => scrollToBottom("instant"), [scrollToBottom, chat.id])
  // useEffect(() => scrollToBottom("smooth"), [scrollToBottom, chat.messages.length])

  const bodyClasses = makeClasses(
    "flex-1",
    "flex",
    "flex-col",
    "h-full",
    "pt-8",
    "pb-64",
    "overflow-y-auto",
    "scrollbar-hide",
    className
  )

  return (
    <div className={bodyClasses}>
      <div ref={bodyStartRef} />
      {children}
      <div ref={bodyEndRef} />
    </div>
  )
}
