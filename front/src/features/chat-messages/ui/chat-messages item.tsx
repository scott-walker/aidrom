import { memo } from "react"
import { type Message } from "@entities/chat"
import { ChatMessage } from "@features/chat-message"

/**
 * Пропсы компонента элемента списка сообщений
 * @namespace Features.ChatMessages.UI.ChatMessagesItem.Props
 */
type ChatMessagesItemProps = {
  index: number
  start: number
  message: Message
  measureElement: (element: HTMLDivElement) => void
}

/**
 * Компонент элемента списка сообщений
 * @namespace Features.ChatMessages.UI.ChatMessagesItem
 */
export const ChatMessagesItem = memo(({ index, start, message, measureElement }: ChatMessagesItemProps) => {
  console.log("ChatMessagesItem", index)

  return (
    <div
      key={message.id}
      ref={measureElement}
      data-index={index}
      className="absolute top-0 left-0 w-full"
      style={{
        transform: `translateY(${start}px)`
      }}
    >
      <ChatMessage {...message} />
    </div>
  )
})
