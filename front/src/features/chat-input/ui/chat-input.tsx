import { makeClasses } from "@lib/style-api"
import { type Chat } from "@entities/chat"
import { useSendMessage } from "../lib/use-send-message"
import { ChatInputTextarea } from "./chat-input-textarea"
import { ChatInputButton } from "./chat-input button"

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
  const containerClasses = makeClasses("relative", "flex", "items-center", "justify-center", className)
  const onSend = () => sendMessage(chat.id)

  return (
    <div className={containerClasses}>
      <ChatInputTextarea onSend={onSend} />
      <ChatInputButton onSend={onSend} />
    </div>
  )
}
