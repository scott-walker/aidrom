import { makeClasses } from "@lib/style-api"
import { Icon } from "@shared/ui/icon"

/**
 * Пропсы пустого списка сообщений
 * @namespace Entities.Chat.MessageEmptyListProps
 */
type MessageEmptyListProps = {
  className?: string
}

/**
 * Пустой список сообщений
 * @namespace Entities.Chat.MessageEmptyList
 */
export const MessageEmptyList = ({ className = "" }: MessageEmptyListProps) => {
  const classes = makeClasses("flex flex-col items-center justify-center gap-8 h-full", className)

  return (
    <div className={classes}>
      <Icon className="text-background-hard" name="bot-message-square" size={200} strokeWidth={1.3} />
      <div className="text-8xl font-mega-bold text-background-hard">Агент готов ответить на ваши вопросы</div>
    </div>
  )
}
