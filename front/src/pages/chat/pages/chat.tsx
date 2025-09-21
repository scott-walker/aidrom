import type { ReactNode } from "react"
import { useParams } from "react-router"
import { ChatDialog } from "@widgets/chat-dialog"

/**
 * Страница чата
 * @namespace Pages.Chat.Chat
 * @returns {ReactNode}
 */
export const Chat = (): ReactNode => {
  const chatId = parseInt(useParams().chatId as string)

  return <ChatDialog chatId={chatId} />
}
