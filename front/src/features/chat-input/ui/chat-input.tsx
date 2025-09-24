import { makeClasses } from "@lib/style-api"
import { useSendMessage } from "../lib/use-send-message"
import { ChatInputTextarea } from "./chat-input-textarea"
import { ChatInputButton } from "./chat-input button"

/**
 * Пропсы компонента ввода сообщения
 * @namespace Features.ChatInput.UI.ChatInputProps
 */
type ChatInputProps = {
  chatId: number
  className?: string
}

/**
 * Компонент ввода сообщения
 * @namespace Features.ChatInput.UI.ChatInput
 */
export const ChatInput = ({ chatId, className = "" }: ChatInputProps) => {
  const { sendMessage } = useSendMessage(chatId)
  const containerClasses = makeClasses(
    "relative",
    "flex",
    "items-center",
    "justify-center",
    "max-w-[490px]",
    "w-full",
    "mx-auto",
    className
  )
  const onSend = (input: string) => sendMessage(input)

  return (
    <div className={containerClasses}>
      <ChatInputTextarea onSend={onSend} />
      <ChatInputButton onSend={onSend} />
    </div>
  )
}
