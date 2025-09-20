import { useEffect, useRef } from "react"

/**
 * Хук для автоматического скролла сообщений
 * @namespace Widgets.ChatDialog.Lib.useScrollMessages
 * @param {number} messagesLength количество сообщений
 */
export const useScrollMessages = (messagesLength: number) => {
  const bodyRef = useRef<HTMLDivElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (bodyRef.current) {
      console.log("scrollToBottom")
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight
    }
  }, [bodyRef])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messagesLength])

  return { bodyRef, messagesEndRef }
}
