import type { ReactNode } from "react"
import { makeClasses } from "@lib/style-api"
import { Icon } from "@ui/icon"
import { ChatCreateButton } from "@features/chat-create/ui/chat-create-button"

/**
 * Пустой чат
 * @namespace Widgets.ChatEmpty.UI.ChatEmpty
 */
export const ChatEmpty = (): ReactNode => {
  const classes = makeClasses(
    "flex",
    "flex-col",
    "items-center",
    "justify-center",
    "gap-6",
    "h-full",
    "text-center",
    "text-foreground-soft/40",
    "bg-background-hard/40",
    "p-6"
  )

  return (
    <div className={classes}>
      <div className="flex flex-col items-center justify-center gap-6 mb-8">
        <div className="text-5xl font-semibold">Выбирете чат</div>
        <Icon className="text-foreground-soft/20" name="message-circle-more" size={100} />
      </div>
      <ChatCreateButton />
    </div>
  )
}
