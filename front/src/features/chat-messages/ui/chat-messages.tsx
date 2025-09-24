import { useEffect, useMemo, useRef, type ReactNode } from "react"
import { useVirtualizer } from "@tanstack/react-virtual"
import { type Message } from "@entities/chat"

import { ChatMessagesItem } from "./chat-messages item"

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
  console.log("ChatMessages")

  const containerRef = useRef<HTMLDivElement>(null)
  const virtualizer = useVirtualizer({
    count: messages.length,
    getScrollElement: () => containerRef.current,
    estimateSize: () => 100
    // overscan: 1
  })

  // useEffect(() => {
  //   virtualizer.scrollToOffset(Number.POSITIVE_INFINITY)
  //   // virtualizer.scrollToIndex(messages.length - 1, { align: "end" })

  //   // // через requestAnimationFrame – после того как DOM реально обновился
  //   // requestAnimationFrame(() => {
  //   //   const el = containerRef.current

  //   //   if (el) {
  //   //     console.log("el.scrollHeight", el.scrollHeight)
  //   //     el.scrollTop = el.scrollHeight + 500
  //   //   }
  //   // })
  // }, [chatId])

  // // Автоскролл вниз
  // useEffect(() => {
  //   if (!containerRef.current) return

  //   const el = containerRef.current
  //   const isAtBottom = Math.abs(el.scrollHeight - el.scrollTop - el.clientHeight) < 50

  //   // Если находимся внизу, то скроллим к последнему сообщению
  //   if (isAtBottom) {
  //     virtualizer.scrollToIndex(messages.length - 1, { align: "end", behavior: "smooth" })
  //   }
  // }, [messages.length, virtualizer])

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
      {children}
    </div>
  )
}
