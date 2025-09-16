import type { ReactNode } from "react"
import { Icon } from "@ui/icon"
import { makeClasses } from "@lib/style-api"
import { useCreateChat } from "../lib/use-create-chat"
import { Tooltip } from "@ui/tooltip"

/**
 * Пропсы кнопки создания чата
 * @namespace Features.ChatCreate.UI.ChatCreateRegularButton.Props
 */
type ChatCreateRegularButtonProps = {
  agentId: number
  disabled?: boolean
  text?: string
  disabledText?: string
  className?: string
}

/**
 * Кнопка создания чата
 * @namespace Features.ChatCreate.UI.ChatCreateRegularButton
 */
export const ChatCreateRegularButton = ({
  agentId,
  disabled = false,
  text = "Создать чат",
  disabledText = "Создание чата запрещено",
  className = ""
}: ChatCreateRegularButtonProps): ReactNode => {
  const { createChat } = useCreateChat({ agentId, clientId: 1 })
  const buttonClasses = makeClasses(
    "flex",
    "items-center",
    "justify-center",
    "gap-1",
    "px-3",
    "py-1",
    "w-fit",
    "text-sm",
    "font-bold",
    "bg-primary",
    "text-primary-foreground",
    "hover:bg-primary-accent",
    "hover:text-primary-foreground-accent",
    "select-none",
    "rounded-2xl",
    "cursor-pointer",
    disabled && "cursor-not-allowed",
    disabled && "opacity-50",
    className
  )

  if (disabled) {
    return (
      <Tooltip text={disabledText}>
        <button className={buttonClasses} disabled={disabled}>
          <Icon name="plus" size={20} strokeWidth={2} /> {text}
        </button>
      </Tooltip>
    )
  }

  return (
    <button className={buttonClasses} onClick={() => createChat("Новый чат")} disabled={disabled}>
      <Icon name="plus" size={20} strokeWidth={2} /> {text}
    </button>
  )
}
