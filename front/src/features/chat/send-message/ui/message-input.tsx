import { useState, useEffect, type ChangeEvent } from "react"
import { makeClasses } from "@lib/style-api"
import { Textarea } from "@ui/textarea"

/**
 * Пропсы инпута для ввода сообщения
 * @namespace Features.Chat.SendMessage.UI.MessageInputProps
 */
type MessageInputProps = {
  value?: string
  onChange?: (value: string) => void
}

/**
 * Инпут для ввода сообщения
 * @namespace Features.Chat.SendMessage.UI.MessageInput
 */
export const MessageInput = ({ value = "", onChange = () => {} }: MessageInputProps) => {
  const [inputValue, setInputValue] = useState(value)
  const classes = makeClasses("w-full", "pr-20", "rounded-2xl")

  useEffect(() => {
    setInputValue(value)

    return () => setInputValue("")
  }, [value])

  const handleChange = ({ target }: ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(target.value)
    onChange(target.value)
  }

  return <Textarea value={inputValue} onChange={handleChange} rows={2} className={classes} />
}
