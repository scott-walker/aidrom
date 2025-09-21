import { useEffect, type CSSProperties, type ReactNode } from "react"
import { makeClasses } from "@lib/style-api"
import { useChatInfoToggleStore } from "@features/chat-info-toggle"
import { useChatListToggleStore } from "@features/chat-list-toggle"
import { CHAT_CONTAINER_CLASS } from "../lib/constants"
import { ChatListBar } from "./chat-listbar"
import { ChatInfoBar } from "./chat-infobar"

/**
 * Пропсы макета
 * @namespace Features.ChatInterface.UI.ChatLayoutProps
 */
interface ChatLayoutProps {
  onMounted?: () => void
  listbar?: ReactNode
  infobar?: ReactNode
}

/**
 * Макет чата
 * @namespace Features.ChatInterface.UI.ChatLayout
 */
export const ChatLayout = ({ onMounted, listbar, infobar }: ChatLayoutProps) => {
  const isChatListVisible = useChatListToggleStore(state => state.isVisible)
  const isChatInfoVisible = useChatInfoToggleStore(state => state.isVisible)

  useEffect(() => {
    onMounted?.()
  }, [])

  const containerClasses = makeClasses("flex", "items-stretch", "justify-between", "h-full")
  const listbarClasses = makeClasses("w-[var(--chat-listbar-width)]", !listbar && "hidden")
  const infobarClasses = makeClasses("w-[var(--chat-infobar-width)]", !infobar && "hidden")
  const chatClasses = makeClasses(
    "flex-1",
    !!infobar && "pr-8",
    "w-[calc(100%-var(--chat-listbar-width)-var(--chat-infobar-width))]",
    CHAT_CONTAINER_CLASS
  )
  const style = {
    "--chat-listbar-width": listbar ? (isChatListVisible ? "350px" : "90px") : "0px",
    "--chat-infobar-width": infobar ? (isChatInfoVisible ? "350px" : "90px") : "0px"
  } as CSSProperties

  return (
    <div className={containerClasses} style={style}>
      {listbar && <ChatListBar className={listbarClasses} />}
      <div className={chatClasses} />
      {infobar && <ChatInfoBar className={infobarClasses} />}
    </div>
  )
}
