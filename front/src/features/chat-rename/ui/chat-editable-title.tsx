import { Tooltip } from "@shared/ui/tooltip"
import type { Chat } from "@entities/chat/lib/types"

/**
 * Пропсы для компонента
 * @namespace Features.ChatRename.UI.ChatEditableTitleProps
 */
type ChatEditableTitleProps = {
  chat: Chat
}

/**
 * Редактируемое название чата
 * @namespace Features.ChatRename.UI.ChatEditableTitle
 */
export const ChatEditableTitle = ({ chat }: ChatEditableTitleProps) => {
  const tooltipDelay = 100

  return (
    <Tooltip text="Переименовать чат" delay={tooltipDelay}>
      <div className="text-lg font-bold cursor-pointer hover:text-primary">{chat.title}</div>
    </Tooltip>
  )
}
