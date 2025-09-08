import { makeClasses } from "@lib/style-api"
import type { Chat } from "@entities/chat"
import { MessageInput } from "./message-input"
import { MessageSendButton } from "./message-send-button"

/**
 * Пропсы компонента ввода сообщения
 * @namespace Features.ChatInput.UI.ChatInputProps
 */
type ChatInputProps = {
  chat: Chat
  className?: string
}

/**
 * Компонент ввода сообщения
 * @namespace Features.ChatInput.UI.ChatInput
 */
export const ChatInput = ({ chat, className = "" }: ChatInputProps) => {
  const inputClasses = makeClasses("relative", "flex", "items-center", "justify-end", "gap-2", "pb-6", className)
  const sendButtonClasses = makeClasses("absolute", "right-6")

  return (
    <div className={inputClasses}>
      <MessageInput chat={chat} />
      <MessageSendButton className={sendButtonClasses} chat={chat} />
    </div>
  )
}
