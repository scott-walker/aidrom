import { useEffect, useRef } from "react"

/**
 * Хук для автоматического скролла сообщений
 * @namespace Widgets.ChatDialog.Lib.useScrollMessages
 * @param {number} messagesLength количество сообщений
 */
export const useScrollMessages = (messagesLength: number) => {
  // const bodyRef = useRef<HTMLDivElement>(null)

  // useEffect(() => {
  //   if (bodyRef.current) {
  //     bodyRef.current.scrollTop = bodyRef.current.scrollHeight
  //   }
  // }, dependencies)

  // return { bodyRef }

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    if (messagesEndRef.current) scrollToBottom()
  }, [messagesLength])

  return { messagesEndRef }
}
