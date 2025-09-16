import type { ReactNode } from "react"
import { Icon } from "@ui/icon"
import { makeClasses } from "@lib/style-api"
import { useCreateChat } from "../lib/use-create-chat"
import { Tooltip } from "@ui/tooltip"
import { Button } from "@ui/button"

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
  const buttonClasses = makeClasses("gap-2", "px-2.5", "py-0.5", "w-fit", className)

  if (disabled) {
    return (
      <Tooltip text={disabledText}>
        <Button className={buttonClasses} disabled={true} rounded>
          <Icon name="plus" size={20} strokeWidth={2} /> {text}
        </Button>
      </Tooltip>
    )
  }

  return (
    <Button className={buttonClasses} onClick={() => createChat("Новый чат")} rounded disabled={disabled}>
      <Icon name="plus" size={18} strokeWidth={3} />
      {text}
    </Button>
  )
}
