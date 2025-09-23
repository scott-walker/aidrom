import { useRef } from "react"

/**
 * Хук для автоматического скролла тела чата
 * @namespace Features.ChatBody.Lib.useScrollBody
 */
export const useScrollBody = () => {
  const bodyStartRef = useRef<HTMLDivElement>(null)
  const bodyEndRef = useRef<HTMLDivElement>(null)

  const scrollToTop = (behavior: "smooth" | "instant" = "smooth") => {
    bodyStartRef.current?.scrollIntoView({ behavior })
  }
  const scrollToBottom = (behavior: "smooth" | "instant" = "smooth") => {
    bodyEndRef.current?.scrollIntoView({ behavior })
  }

  return { bodyStartRef, bodyEndRef, scrollToTop, scrollToBottom }
}
