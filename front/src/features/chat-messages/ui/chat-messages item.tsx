import { memo, type ReactNode } from "react"

/**
 * Пропсы компонента элемента списка сообщений
 * @namespace Features.ChatMessages.UI.ChatMessagesItem.Props
 */
type ChatMessagesItemProps = {
  itemKey: string
  index: number
  start: number
  children?: ReactNode
  measureElement: (element: HTMLDivElement) => void
}

/**
 * Компонент элемента списка сообщений
 * @namespace Features.ChatMessages.UI.ChatMessagesItem
 */
export const ChatMessagesItem = memo(({ itemKey, index, start, children, measureElement }: ChatMessagesItemProps) => {
  return (
    <div
      key={itemKey}
      ref={measureElement}
      data-index={index}
      className="absolute top-0 left-0 w-full"
      style={{
        transform: `translateY(${start}px)`
      }}
    >
      {children}
    </div>
  )
})
