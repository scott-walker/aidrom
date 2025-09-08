import { Icon } from "@ui/icon"
import { Loader } from "@ui/loader"

/**
 * Чат в процессе отправки сообщения
 * @namespace Entities.Chat.UI.ChatPending
 */
export const ChatPending = () => {
  return (
    <div className="flex flex-col items-center justify-center p-6">
      <Icon name="bot-message-square" className="text-background-hard" size={64} />
      <p className="ml-2 text-3xl font-mega-bold text-background-hard">Я думаю...</p>
      <Loader />
    </div>
  )
}
