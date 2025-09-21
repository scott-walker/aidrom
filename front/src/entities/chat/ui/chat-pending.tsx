import { Icon } from "@ui/icon"
import { InlineLoader } from "@ui/loader"

/**
 * Чат в процессе отправки сообщения
 * @namespace Entities.Chat.UI.ChatPending
 */
export const ChatPending = () => {
  return (
    <div className="relative">
      <div className="absolute top-12 left-0 w-full h-full flex flex-col items-center justify-center">
        <div className="flex flex-col items-center">
          <Icon name="bot-message-square" className="text-foreground-soft/60" size={42} />
          {/* <p className="ml-2 text-xl font-mega-bold text-background-hard">Я думаю...</p> */}
          <div className="mt-2">
            <InlineLoader />
          </div>
        </div>
      </div>
    </div>
  )
}
