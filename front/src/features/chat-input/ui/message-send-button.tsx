import { IconButton } from "@ui/icon-button"
import type { Chat } from "@entities/chat"

/**
 * Пропсы кнопки отправки сообщения
 * @namespace Features.ChatInput.UI.MessageSendButtonProps
 */
type MessageSendButtonProps = {
  chat: Chat
  className?: string
}

/**
 * Кнопка отправки сообщения
 * @namespace Features.ChatInput.UI.MessageSendButton
 */
export const MessageSendButton = ({ chat, className = "" }: MessageSendButtonProps) => {
  const handleClick = () => {
    console.log(chat)
  }

  return (
    <IconButton schema="primary" circle={true} iconSize={16} icon="send" className={className} onClick={handleClick} />
  )
}
