import { makeClasses } from "@lib/style-api"
import type { Chat } from "@entities/chat"
import { ChatRename } from "@features/chat-rename"
import { ChatDelete } from "@features/chat-delete"

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
  const headerClasses = makeClasses("absolute", "z-10", "top-0", "left-0", "right-0", "flex", "items-center")
  const panelClasses = makeClasses(
    "flex",
    "items-center",
    "gap-4",
    "w-fit",
    "mx-auto",
    "bg-background-soft",
    "rounded-bl-xl",
    "rounded-br-xl",
    "px-6",
    "py-2",
    "text-foreground",
    "font-semibold",
    "shadow-md/5"
  )

  return (
    <header className={headerClasses}>
      <div className={panelClasses}>
        <ChatRename chat={chat} />
        <ChatDelete chat={chat} />
      </div>
    </header>
  )
}
