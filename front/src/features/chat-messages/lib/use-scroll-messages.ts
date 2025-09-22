import { useEffect, useRef } from "react"

/**
 * Хук для автоматического скролла сообщений
 * @namespace Widgets.ChatDialog.Lib.useScrollMessages
 * @param {number} messagesLength количество сообщений
 */
export const useScrollMessages = (messagesLength: number) => {
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = (behavior: "smooth" | "instant" = "smooth") => {
    messagesEndRef.current?.scrollIntoView({ behavior })
  }

  useEffect(() => scrollToBottom("smooth"), [messagesLength])

  return { messagesEndRef, scrollToBottom }
}
