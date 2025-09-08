import { useEffect, useRef } from "react"

/**
 * Хук для автоматического скролла тела диалога
 * @namespace Widgets.ChatDialog.Lib.useScrollBody
 * @param {unknown[]} dependencies зависимости для рендера
 */
export const useScrollBody = (...dependencies: unknown[]) => {
  const bodyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight
    }
  }, dependencies)

  return { bodyRef }
}
