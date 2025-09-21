import type { ReactNode } from "react"
import { useParams } from "react-router"
import { ChatDialog } from "@widgets/chat-dialog"
import { ChatInfo } from "@features/chat-info"
import { Layout } from "../layout"

/**
 * Страница чата
 * @namespace Pages.Chat.Chat
 * @returns {ReactNode}
 */
export const Chat = (): ReactNode => {
  const chatId = parseInt(useParams().chatId as string)

  return (
    <Layout infobar={<ChatInfo chatId={chatId} />}>
      <ChatDialog chatId={chatId} />
    </Layout>
  )
}
