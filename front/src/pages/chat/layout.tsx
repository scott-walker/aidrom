import type { ReactNode } from "react"
import { useParams } from "react-router"
import { useLayoutTitle } from "@lib/layout-api"
import { ChatInterface } from "@features/chat-interface"
import { ChatList } from "@features/chat-list"
import { ChatInfo } from "@features/chat-info"

/**
 * Пропсы макета
 * @namespace Pages.Chat.Layout.Props
 */
type LayoutProps = {
  children: ReactNode
  infobar?: ReactNode
}

/**
 * Макет страницы
 * @namespace Pages.Chat.Layout
 */
export const Layout = ({ children }: LayoutProps) => {
  const chatId = parseInt(useParams().chatId as string)

  useLayoutTitle("Чаты")

  const infobar = chatId ? <ChatInfo chatId={chatId} /> : null

  return (
    <ChatInterface listbar={<ChatList />} infobar={infobar}>
      {children}
    </ChatInterface>
  )
}
