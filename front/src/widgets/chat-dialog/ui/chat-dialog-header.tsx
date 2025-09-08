import { makeClasses } from "@lib/style-api"
import type { Chat } from "@entities/chat"

/**
 * Пропсы чата
 * @namespace Widgets.Chat.ChatProps
 */
type ChatDialogHeaderProps = {
  chat: Chat
}

/**
 * Стуктура чата
 * @namespace Widgets.Chat
 */
export const ChatDialogHeader = ({ chat }: ChatDialogHeaderProps) => {
  const headerClasses = makeClasses("absolute top-0 left-0 right-0")
  const chatTitleClasses = makeClasses(
    "w-fit",
    "mx-auto",
    "bg-background",
    "rounded-bl-xl",
    "rounded-br-xl",
    "px-14",
    "py-2",
    "text-foreground",
    "font-semibold",
    "shadow-xs"
  )

  return (
    <header className={headerClasses}>
      <h6 className={chatTitleClasses}>{chat.title}</h6>
    </header>
  )
}
