import { useChatStore } from "@entities/chat"
import { makeClasses } from "@shared/lib/style-api"
import { IconButton } from "@ui/icon-button"

/**
 * Пропсы кнопки отправки сообщения
 * @namespace Features.ChatInput.UI.SendButtonProps
 */
type SendButtonProps = {
  onSend: () => void
  className?: string
}

/**
 * Кнопка отправки сообщения
 * @namespace Features.ChatInput.UI.SendButton
 */
export const SendButton = ({ onSend, className = "" }: SendButtonProps) => {
  const { isPending, input } = useChatStore()
  const disabled = isPending || !input.trim()
  const classes = makeClasses(disabled && "bg-background-hard", "h-12", "w-12", className)

  return (
    <IconButton
      schema="primary"
      circle
      iconSize={22}
      icon="send"
      iconStrokeWidth={2.2}
      className={classes}
      disabled={disabled}
      onClick={onSend}
    />
  )
}
