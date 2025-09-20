import type { ReactNode } from "react"
import { ChatEmpty } from "@widgets/chat-empty"
import { Layout } from "../layout"

/**
 * Главная страница чата
 * @namespace Pages.Chat.Main
 * @returns {ReactNode}
 */
export const Main = (): ReactNode => {
  return (
    <Layout>
      <ChatEmpty />
    </Layout>
  )
}
