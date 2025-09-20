import { type ChangeEvent, type KeyboardEvent } from "react"
import { makeClasses } from "@lib/style-api"
import { Textarea } from "@ui/textarea"
import { useChatStore } from "@entities/chat"
import { PLACEHOLDER_TEXT } from "../lib/constants"

/**
 * Пропсы компонента поля ввода сообщения
 * @namespace Features.ChatInput.UI.ChatTextareaProps
 */
type ChatInputTextareaProps = {
  className?: string
  onSend: () => void
}

/**
 * Компонент поля ввода сообщения
 * @namespace Features.ChatInput.UI.ChatTextarea
 */
export const ChatInputTextarea = ({ className = "", onSend }: ChatInputTextareaProps) => {
  const { isPending, input, setInput } = useChatStore()
  const textareaClasses = makeClasses(
    "w-full",
    "pr-20",
    "bg-background-soft",
    "rounded-2xl",
    "shadow-md",
    "focus-within:shadow-lg",
    className
  )

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
    <Textarea
      value={input}
      disabled={isPending}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      rows={2}
      className={textareaClasses}
      placeholder={PLACEHOLDER_TEXT}
    />
  )
}
