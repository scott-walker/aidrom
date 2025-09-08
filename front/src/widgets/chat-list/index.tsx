import { makeClasses } from "@lib/style-api"
import { BlockLoader } from "@ui/block-loader"
import { Notification } from "@ui/notification"
import { ChatList as ChatListComponent } from "@entities/chat/ui/chat-list"
import { useChats } from "@entities/chat/api/chat-queries"
import { Heading } from "@shared/ui/heading"
import { useState } from "react"
import { IconButton } from "@shared/ui/icon-button"
import { Tooltip } from "@shared/ui/tooltip"

/**
 * Список чатов
 * @namespace Widgets.ChatList
 */
export const ChatList = () => {
  const LS_KEY = "chatListOpen"

  const [isOpen, setIsOpen] = useState(localStorage.getItem(LS_KEY) === "true" || false)
  const { chats, isLoading, error } = useChats()

  const containerClasses = makeClasses(
    "flex",
    "flex-col",
    "h-full",
    // isOpen
    isOpen && "w-[300px]",
    !isOpen && "w-fit"
  )
  const headerClasses = makeClasses("flex", "justify-between", "items-center", "px-6", "py-4")
  const contentClasses = makeClasses("flex", "flex-col", "overflow-y-auto", "scrollbar-hide")

  const toggleOpen = () => {
    localStorage.setItem(LS_KEY, isOpen ? "false" : "true")
    setIsOpen(!isOpen)
  }

  if (isLoading) return <BlockLoader />
  if (error) return <Notification type="error">{error.message}</Notification>

  return (
    <div className={containerClasses}>
      <header className={headerClasses}>
        {isOpen && <Heading level={5}>Чаты</Heading>}

        <Tooltip text={isOpen ? "Свернуть" : "Развернуть список чатов"} side="right" delay={500}>
          <IconButton icon={isOpen ? "panel-right-open" : "panel-left-open"} iconSize={24} onClick={toggleOpen} />
        </Tooltip>
      </header>

      <div className={contentClasses}>
        <ChatListComponent chats={chats} className={isOpen ? "" : "hidden"} />
      </div>
    </div>
  )
}
