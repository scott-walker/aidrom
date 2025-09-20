import { makeClasses } from "@lib/style-api"
import { IconButton } from "@ui/icon-button"
import { useChatStore } from "@entities/chat"

/**
 * Пропсы компонента кнопки отправки сообщения
 * @namespace Features.ChatInput.UI.ChatInputButtonProps
 */
type ChatInputButtonProps = {
  onSend: (input: string) => void
  className?: string
}

/**
 * Компонент кнопки отправки сообщения
 * @namespace Features.ChatInput.UI.ChatInputButton
 */
export const ChatInputButton = ({ onSend }: ChatInputButtonProps) => {
  const isPending = useChatStore(state => state.isPending)
  const input = useChatStore(state => state.input)
  const setInput = useChatStore(state => state.setInput)

  const disabledButton = !input.trim() || isPending
  const buttonClasses = makeClasses("absolute", "right-6", "h-12", "w-12", disabledButton && "bg-background-hard")

  const handleClick = () => {
    onSend(input)
    setInput("")
  }

  return (
    <IconButton
      schema="primary"
      circle
      iconSize={22}
      icon="send"
      iconStrokeWidth={2.2}
      className={buttonClasses}
      disabled={disabledButton}
      onClick={handleClick}
    />
  )
}
