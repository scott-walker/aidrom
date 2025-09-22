import { useRef } from "react"

/**
 * Хук для автоматического скролла сообщений
 * @namespace Features.ChatMessages.Lib.useScrollMessages
 */
export const useScrollMessages = () => {
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = (behavior: "smooth" | "instant" = "smooth") => {
    messagesEndRef.current?.scrollIntoView({ behavior })
  }

  return { messagesEndRef, scrollToBottom }
}
