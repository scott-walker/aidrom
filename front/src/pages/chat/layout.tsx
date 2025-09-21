import type { ReactNode } from "react"
import { useLayoutTitle } from "@lib/layout-api"
import { ChatInterface } from "@features/chat-interface"
import { ChatList } from "@features/chat-list"

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
export const Layout = ({ children, infobar }: LayoutProps) => {
  useLayoutTitle("Чаты")

  return (
    <ChatInterface listbar={<ChatList />} infobar={infobar}>
      {children}
    </ChatInterface>
  )
}
