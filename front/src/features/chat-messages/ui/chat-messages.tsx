import { useMemo, useRef } from "react"
import { useVirtualizer } from "@tanstack/react-virtual"
import { type Message } from "@entities/chat"

import { ChatMessagesItem } from "./chat-messages item"

/**
 * Пропсы компонента сообщений
 * @namespace Features.ChatMessages.Props
 */
type ChatMessagesProps = {
  messages: Message[]
}

/**
 * Компонент сообщений
 * @namespace Features.ChatMessages
 */
export const ChatMessages = ({ messages }: ChatMessagesProps) => {
  console.log("ChatMessages")

  const containerRef = useRef<HTMLDivElement>(null)
  const virtualizer = useVirtualizer({
    count: messages.length,
    getScrollElement: () => containerRef.current,
    estimateSize: () => 100
    // overscan: 1
  })

  const virtualItems = virtualizer.getVirtualItems()
  const messageItems = useMemo(() => {
    console.log("messageItemsUseMemo", virtualItems.length)

    return virtualItems.map(virtualRow => {
      // const isLast = virtualRow.index === messages.length
      const message = messages[virtualRow.index]

      return (
        <ChatMessagesItem
          key={message.id}
          index={virtualRow.index}
          start={virtualRow.start}
          message={message}
          measureElement={virtualizer.measureElement}
        />
      )
    })
  }, [messages, virtualItems])

  return (
    <div ref={containerRef} className="w-full h-full overflow-y-auto scrollbar-hide pt-10 pb-64">
      <div
        className="relative flex flex-col w-full"
        style={{
          height: `${virtualizer.getTotalSize()}px`
        }}
      >
        {messageItems}
      </div>
    </div>
  )
}
