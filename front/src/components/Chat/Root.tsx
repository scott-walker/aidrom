import type { JSX } from "react"
import { mergeClasses } from "@/utils/jsxtools"
import { chatClasses } from "./assets"
import ChatHeader from "./Header"
import Messages from "./Messages"
import ChatInput from "./Input"
import type { ChatProps } from "./types"

/**
 * Основной компонент чата
 * @namespace Chat.Root
 * @param {ChatProps} props - Свойства компонента
 * @returns {JSX.Element} - Основной компонент чата
 */
export default function Chat({
  messages,
  onSendMessage,
  isLoading = false,
  title = "Чат",
  placeholder = "Введите сообщение...",
  className
}: ChatProps): JSX.Element {
  return (
    <div className={mergeClasses(chatClasses, className)}>
      <ChatHeader title={title} />
      <Messages messages={messages} />
      <ChatInput onSendMessage={onSendMessage} placeholder={placeholder} disabled={isLoading} />
    </div>
  )
}
