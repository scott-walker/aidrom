import { useRef } from "react"

/**
 * Хук для автоматического скролла чата
 * @namespace Features.ChatScroller.Lib.useScroll
 */
export const useScroll = () => {
  const scrollerStartRef = useRef<HTMLDivElement>(null)
  const scrollerEndRef = useRef<HTMLDivElement>(null)

  const scrollToTop = (behavior: "smooth" | "instant" = "smooth") => {
    scrollerStartRef.current?.scrollIntoView({ behavior })
  }
  const scrollToBottom = (behavior: "smooth" | "instant" = "smooth") => {
    scrollerEndRef.current?.scrollIntoView({ behavior })
  }

  return { scrollerStartRef, scrollerEndRef, scrollToTop, scrollToBottom }
}
