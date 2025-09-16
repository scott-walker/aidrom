import type { ReactNode } from "react"
import { Icon } from "@ui/icon"
import { makeClasses } from "@lib/style-api"
import { useCreateChat } from "../lib/use-create-chat"

/**
 * Пропсы кнопки создания чата
 * @namespace Features.ChatCreate.UI.ChatCreateRegularButton.Props
 */
type ChatCreateRegularButtonProps = {
  agentId: number
  text?: string
}

/**
 * Кнопка создания чата
 * @namespace Features.ChatCreate.UI.ChatCreateRegularButton
 */
export const ChatCreateRegularButton = ({ agentId, text = "Создать чат" }: ChatCreateRegularButtonProps): ReactNode => {
  const { createChat } = useCreateChat({ agentId, clientId: 1 })
  const createChatLinkClasses = makeClasses(
    "flex",
    "items-center",
    "justify-center",
    "gap-1",
    "px-3",
    "py-1",
    "my-2",
    "w-fit",
    "text-sm",
    "font-bold",
    "bg-primary",
    "text-primary-foreground",
    "hover:bg-primary-accent",
    "hover:text-primary-foreground-accent",
    "select-none",
    "rounded-2xl"
  )
  return (
    <a className={createChatLinkClasses} onClick={() => createChat("Новый чат")}>
      <Icon name="plus" size={20} strokeWidth={2} /> {text}
    </a>
  )
}
