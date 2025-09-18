import { useState, type ChangeEvent, type KeyboardEvent } from "react"
import { makeClasses } from "@lib/style-api"
import { IconButton } from "@ui/icon-button"
import { Textarea } from "@ui/textarea"
import { useChatStore, type Chat } from "@entities/chat"
import { useSendMessage } from "../lib/use-send-message"
import { PLACEHOLDER_TEXT } from "../lib/constants"

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
  const { isPending } = useChatStore()
  const { sendMessage } = useSendMessage()
  const [input, setInput] = useState<string>("")
  const disabledInput = isPending
  const disabledButton = !input.trim() || isPending

  const onSend = () => {
    sendMessage(chat.id, input)
    setInput("")
  }

  const containerClasses = makeClasses("relative", "flex", "items-center", "justify-center", className)
  const inputClasses = makeClasses(
    "w-full",
    "pr-20",
    "bg-background-soft",
    "rounded-2xl",
    "shadow-md",
    "focus-within:shadow-lg"
  )
  const buttonClasses = makeClasses("absolute", "right-6", "h-12", "w-12", disabledButton && "bg-background-hard")

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.currentTarget.value)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (!e.shiftKey && e.key === "Enter") {
      e.preventDefault()
      onSend()
    }
  }

  return (
    <div className={containerClasses}>
      <Textarea
        disabled={disabledInput}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        rows={2}
        className={inputClasses}
        placeholder={PLACEHOLDER_TEXT}
      />
      <IconButton
        schema="primary"
        circle
        iconSize={22}
        icon="send"
        iconStrokeWidth={2.2}
        className={buttonClasses}
        disabled={disabledButton}
        onClick={onSend}
      />
    </div>
  )
}
