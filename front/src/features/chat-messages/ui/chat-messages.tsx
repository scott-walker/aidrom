import { useMemo, useRef, useEffect, type ReactNode } from "react"
import { useVirtualizer } from "@tanstack/react-virtual"
import { type Message } from "@entities/chat"
import { ChatMessage } from "@features/chat-message"

import { ChatMessagesItem } from "./chat-messages item"
import { makeClasses } from "@shared/lib/style-api"

/**
 * Пропсы компонента сообщений
 * @namespace Features.ChatMessages.Props
 */
type ChatMessagesProps = {
  chatId: number
  messages: Message[]
  children?: ReactNode
}

/**
 * Компонент сообщений
 * @namespace Features.ChatMessages
 */
export const ChatMessages = ({ chatId, messages, children }: ChatMessagesProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const virtualizer = useVirtualizer({
    count: messages.length + 1,
    getScrollElement: () => containerRef.current,
    estimateSize: () => 300
  })

  const virtualItems = virtualizer.getVirtualItems()
  const messageItems = useMemo(() => {
    return virtualItems.map(virtualRow => {
      const message = messages[virtualRow.index]
      const isLast = virtualRow.index === messages.length

      const key = isLast ? "last" : message.id
      const content = isLast ? <div className="h-64 w-full"></div> : <ChatMessage {...message} />

      return (
        <ChatMessagesItem
          itemKey={key}
          index={virtualRow.index}
          start={virtualRow.start}
          measureElement={virtualizer.measureElement}
        >
          {content}
        </ChatMessagesItem>
      )
    })
  }, [messages, virtualItems])

  useEffect(() => {
    virtualizer.scrollToIndex(messages.length, { align: "end" })
  }, [virtualizer, chatId])

  const containerClasses = makeClasses("w-full", "h-full", "overflow-y-auto", "scrollbar-hide", "pt-10")

  return (
    <div ref={containerRef} className={containerClasses}>
      <div
        className="relative flex flex-col w-full"
        style={{
          height: `${virtualizer.getTotalSize()}px`
        }}
      >
        {messageItems}
      </div>
      {children}
    </div>
  )
}
