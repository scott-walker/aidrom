import type { ReactNode } from "react"
import { makeClasses } from "@lib/style-api"
import { Icon } from "@shared/ui/icon"
import { Button } from "@shared/ui/button"
import { useCreateNewChat } from "../lib/use-create-chat"

/**
 * Пропсы пустого чата
 * @namespace Features.Chat.EmptyChat.UI.Empty.Props
 */
export type EmptyProps = {
  heading?: string
  className?: string
  onCreateChat?: () => void
}

/**
 * Пустой чат
 * @namespace Features.Chat.EmptyChat.UI.Empty
 * @returns {ReactNode}
 */
export const Empty = ({ heading = "Выбирете чат", className = "" }: EmptyProps): ReactNode => {
  const { createChat } = useCreateNewChat()

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
    "p-6",
    className
  )

  return (
    <div className={classes}>
      <div className="flex flex-col items-center justify-center gap-6 mb-8">
        <div className="text-5xl font-semibold">{heading}</div>
        <Icon className="text-foreground-soft/20" name="message-circle-more" size={100} />
      </div>
      <Button schema="brand" className="px-6 py-4 rounded-4xl font-bold text-2xl" onClick={createChat}>
        Создать чат
      </Button>
    </div>
  )
}
