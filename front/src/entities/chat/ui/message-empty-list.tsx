import { makeClasses } from "@lib/style-api"
import { Icon } from "@shared/ui/icon"

/**
 * Пустой список сообщений
 * @namespace Entities.Chat.UI.MessageEmptyList
 */
export const MessageEmptyList = () => {
  const classes = makeClasses("flex flex-col items-center justify-center gap-8 h-full")

  return (
    <div className={classes}>
      <Icon className="text-background-hard" name="bot-message-square" size={200} strokeWidth={1.3} />
      <div className="text-8xl font-mega-bold text-background-hard">Агент готов ответить на ваши вопросы</div>
    </div>
  )
}
