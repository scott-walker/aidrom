import type { ReactNode } from "react"
import { useTitle } from "@lib/layout-api/utils"
import { ChatLayout } from "@widgets/chat"

/**
 * Макет страницы
 * @namespace Pages.Chat.Layout
 */
export const Layout = ({ children }: { children: ReactNode }) => {
  useTitle("Чат")

  return <ChatLayout>{children}</ChatLayout>
}
