import { useEffect } from "react"
import { useChatStore, type Message } from "@entities/chat"
import { useScroll } from "../lib/use-scroll"

/**
 * Пропсы компонента скроллера
 * @namespace Features.ChatScroller.Props
 */
type ChatScrollerProps = {
  chatId: number
}

/**
 * Компонент скроллера
 * @namespace Features.ChatScroller
 */
export const ChatScroller = ({ chatId }: ChatScrollerProps) => {
  const isPending = useChatStore(state => state.isPending)
  const { scrollerEndRef, scrollToBottom } = useScroll()

  console.log("ChatScroller isPending", isPending)

  useEffect(() => scrollToBottom("instant"), [scrollToBottom, chatId])
  useEffect(() => scrollToBottom("smooth"), [scrollToBottom, isPending])

  return <div ref={scrollerEndRef} />
}
