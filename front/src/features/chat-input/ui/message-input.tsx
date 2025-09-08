import { type ChangeEvent, type KeyboardEvent } from "react"
import { makeClasses } from "@lib/style-api"
import { Textarea } from "@ui/textarea"
import { useChatStore } from "@entities/chat"
import { PLACEHOLDER_TEXT } from "../lib/constants"

/**
 * Пропсы инпута для ввода сообщения
 * @namespace Features.ChatInput.UI.MessageInputProps
 */
type MessageInputProps = {
  onSend: () => void
}

/**
 * Инпут для ввода сообщения
 * @namespace Features.ChatInput.UI.MessageInput
 */
export const MessageInput = ({ onSend }: MessageInputProps) => {
  const { input, isPending, setInput } = useChatStore()
  const classes = makeClasses(
    "w-full",
    "pr-20",
    "bg-background-soft",
    "rounded-2xl",
    "shadow-md",
    "focus-within:shadow-lg"
  )

  const handleChange = ({ target }: ChangeEvent<HTMLTextAreaElement>) => {
    setInput(target.value)
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
      className={classes}
      placeholder={PLACEHOLDER_TEXT}
    />
  )
}
