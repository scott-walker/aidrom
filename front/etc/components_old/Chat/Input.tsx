import type { JSX } from "react"
import { useState } from "react"
import { Button } from "@/components_old/ui/Button"
import { Textarea } from "@/components_old/ui/textarea"
import { Send } from "lucide-react"
import { mergeClasses } from "@/utils/jsxtools"
import { chatInputClasses } from "./assets"
import type { ChatInputProps } from "./types"

/**
 * Компонент ввода сообщения чата
 * @namespace Chat.Input
 * @param {ChatInputProps} props - Свойства компонента
 * @returns {JSX.Element} - Компонент ввода сообщения
 */
export default function ChatInput({
  onSendMessage,
  placeholder = "Введите сообщение...",
  disabled = false,
  className
}: ChatInputProps): JSX.Element {
  const [message, setMessage] = useState("")

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault()
    if (message.trim() && !disabled) {
      onSendMessage(message.trim())
      setMessage("")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent): void => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <form onSubmit={handleSubmit} className={mergeClasses(chatInputClasses, className)}>
      <div className="flex gap-2">
        <Textarea
          value={message}
          onChange={e => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          className="min-h-[60px] max-h-[120px] resize-none"
          rows={1}
        />
        <Button type="submit" disabled={!message.trim() || disabled} size="icon" className="self-end">
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </form>
  )
}
