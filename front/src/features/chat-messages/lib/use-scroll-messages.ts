import { useRef } from "react"

/**
 * Хук для автоматического скролла сообщений
 * @namespace Features.ChatMessages.Lib.useScrollMessages
 */
export const useScrollMessages = () => {
  const messagesStartRef = useRef<HTMLDivElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToTop = (behavior: "smooth" | "instant" = "smooth") => {
    messagesStartRef.current?.scrollIntoView({ behavior })
  }
  const scrollToBottom = (behavior: "smooth" | "instant" = "smooth") => {
    messagesEndRef.current?.scrollIntoView({ behavior })
  }

  return { messagesStartRef, messagesEndRef, scrollToTop, scrollToBottom }
}
