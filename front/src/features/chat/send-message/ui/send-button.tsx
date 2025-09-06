import { makeClasses } from "@lib/style-api"
import { IconButton, type IconButtonProps } from "@ui/icon-button"

/**
 * Пропсы кнопки отправки сообщения
 * @namespace Features.Chat.SendMessage.UI.SendButtonProps
 */
type SendButtonProps = Omit<IconButtonProps, "icon" | "schema" | "circle" | "iconSize"> & {
  className?: string
}

/**
 * Кнопка отправки сообщения
 * @namespace Features.Chat.SendMessage.UI.SendButton
 */
export const SendButton = ({ className = "", ...props }: SendButtonProps) => {
  const classes = makeClasses("p-0", className)

  return <IconButton {...props} schema="primary" circle={true} iconSize={16} icon="send" className={classes} />
}
