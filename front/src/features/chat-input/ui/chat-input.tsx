import { makeClasses } from "@lib/style-api"
import type { Chat } from "@entities/chat"
import { useSendMessage } from "../lib/use-send-message"
import { MessageInput } from "./message-input"
import { SendButton } from "./send-button"

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
  const { sendMessage } = useSendMessage()
  const onSend = () => sendMessage(chat.id)

  const inputClasses = makeClasses("relative", "flex", "items-center", "justify-center", className)
  const sendButtonClasses = makeClasses("absolute", "right-6")

  return (
    <div className={inputClasses}>
      <MessageInput onSend={onSend} />
      <SendButton className={sendButtonClasses} onSend={onSend} />
    </div>
  )
}
