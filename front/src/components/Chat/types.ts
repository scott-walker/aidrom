import type { ReactNode } from "react"

/**
 * Тип сообщения в чате
 * @namespace Chat.Types.Message
 */
export interface Message {
  id: string
  content: string
  sender: "user" | "assistant"
  timestamp: Date
  avatar?: string
  name?: string
}

/**
 * Тип пропсов для компонента чата
 * @namespace Chat.Types.ChatProps
 */
export interface ChatProps {
  messages: Message[]
  onSendMessage: (message: string) => void
  isLoading?: boolean
  title?: string
  placeholder?: string
  className?: string
}

/**
 * Тип пропсов для компонента сообщения
 * @namespace Chat.Types.MessageProps
 */
export interface MessageProps {
  message: Message
  className?: string
}

/**
 * Тип пропсов для компонента ввода сообщения
 * @namespace Chat.Types.ChatInputProps
 */
export interface ChatInputProps {
  onSendMessage: (message: string) => void
  placeholder?: string
  disabled?: boolean
  className?: string
}

/**
 * Тип пропсов для компонента заголовка чата
 * @namespace Chat.Types.ChatHeaderProps
 */
export interface ChatHeaderProps {
  title?: string
  className?: string
  children?: ReactNode
}
