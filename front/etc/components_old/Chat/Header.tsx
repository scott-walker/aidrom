import type { JSX } from "react"
import { mergeClasses } from "@/utils/jsxtools"
import { chatHeaderClasses } from "./assets"
import type { ChatHeaderProps } from "./types"

/**
 * Компонент заголовка чата
 * @namespace Chat.Header
 * @param {ChatHeaderProps} props - Свойства компонента
 * @returns {JSX.Element} - Компонент заголовка чата
 */
export default function ChatHeader({ title, className, children }: ChatHeaderProps): JSX.Element {
  return (
    <div className={mergeClasses(chatHeaderClasses, className)}>
      <div className="flex items-center gap-2">
        <h3 className="font-semibold text-lg">{title || "Чат"}</h3>
      </div>
      {children}
    </div>
  )
}
