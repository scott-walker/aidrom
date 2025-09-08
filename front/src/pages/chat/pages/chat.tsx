import type { ReactNode } from "react"
import { useParams } from "react-router"
import { Chat as ChatApp } from "@widgets/chat"

/**
 * Страница чата
 * @namespace Pages.Chat.Chat
 * @returns {ReactNode}
 */
export const Chat = (): ReactNode => {
  const { chatId } = useParams()

  return <ChatApp chatId={Number(chatId)} />
}
