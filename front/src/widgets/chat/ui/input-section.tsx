import { makeClasses } from "@lib/style-api"
import { MessageInput } from "@features/chat/send-message/ui/message-input"
import { SendButton } from "@features/chat/send-message/ui/send-button"

/**
 * Секция ввода сообщения
 * @namespace Widgets.Chat.UI.InputSection
 */
export const InputSection = () => {
  const classes = makeClasses("relative", "flex", "items-center", "justify-end", "gap-2")
  const sendButtonClasses = makeClasses("absolute", "right-6")

  return (
    <div className={classes}>
      <MessageInput />
      <SendButton className={sendButtonClasses} />
    </div>
  )
}
