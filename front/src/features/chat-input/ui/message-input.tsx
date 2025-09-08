import { useState, useEffect, type ChangeEvent } from "react"
import { makeClasses } from "@lib/style-api"
import { Textarea } from "@ui/textarea"
import type { Chat } from "@entities/chat"
import { PLACEHOLDER_TEXT } from "../lib/constants"

/**
 * Пропсы инпута для ввода сообщения
 * @namespace Features.ChatInput.UI.MessageInputProps
 */
type MessageInputProps = {
  chat: Chat
  onChange?: (value: string) => void
}

/**
 * Инпут для ввода сообщения
 * @namespace Features.ChatInput.UI.MessageInput
 */
export const MessageInput = ({ chat, onChange = () => {} }: MessageInputProps) => {
  const [value, setValue] = useState<string>("")
  const classes = makeClasses(
    "w-full",
    "pr-20",
    "bg-background-soft",
    "rounded-2xl",
    "shadow-md",
    "focus-within:shadow-lg"
  )

  useEffect(() => {
    setValue(value)

    return () => setValue("")
  }, [value])

  const handleChange = ({ target }: ChangeEvent<HTMLTextAreaElement>) => {
    console.log(chat)

    setValue(target.value)
    onChange(target.value)
  }

  return <Textarea value={value} onChange={handleChange} rows={2} className={classes} placeholder={PLACEHOLDER_TEXT} />
}
