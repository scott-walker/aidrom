import { type ReactNode, useState } from "react"
import { ChatLayout } from "./chat-layout"
import { ChatPortal } from "./chat-portal"

/**
 * Пропсы интерфейса чата
 * @namespace Features.ChatInterface.UI.ChatInterfaceProps
 */
interface ChatInterfaceProps {
  children: ReactNode
  listbar?: ReactNode
  infobar?: ReactNode
}

/**
 * Интерфейс чата
 * @namespace Features.ChatInterface.UI.ChatInterface
 */
export const ChatInterface = ({ children, listbar, infobar }: ChatInterfaceProps) => {
  const [isMounted, setIsMounted] = useState(false)

  return (
    <>
      <ChatLayout onMounted={() => setIsMounted(true)} listbar={listbar} infobar={infobar} />
      {isMounted && (
        <ChatPortal listbar={listbar} infobar={infobar}>
          {children}
        </ChatPortal>
      )}
    </>
  )
}
