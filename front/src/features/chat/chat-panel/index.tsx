import { makeClasses } from "@lib/style-api"
import { IconButton } from "@ui/icon-button"
import { Tooltip } from "@ui/tooltip"
import type { Chat } from "@entities/chat/lib/types"

/**
 * Пропсы панели чата
 * @namespace Features.Chat.ChatPanel.ChatPanelProps
 */
type ChatPanelProps = {
  chat: Chat
}

/**
 * Панель чата
 * @namespace Features.Chat.ChatPanel
 */
export const ChatPanel = ({ chat }: ChatPanelProps) => {
  const tooltipDelay = 500
  const containerClasses = makeClasses(
    "flex",
    "items-center",
    "justify-center",
    "gap-2",
    "w-fit",
    "mx-auto",
    "px-4",
    "py-2",
    "bg-background-soft",
    "rounded-bl-xl",
    "rounded-br-xl",
    "shadow-md/10"
  )

  return (
    <div className={containerClasses}>
      <Tooltip text="Переименовать чат" delay={tooltipDelay}>
        <div className="text-lg font-bold cursor-pointer hover:text-primary">{chat.title}</div>
      </Tooltip>

      <div className="flex items-center gap-2 ml-4">
        <Tooltip text="Скрыть список чатов" delay={tooltipDelay}>
          <IconButton icon="sidebar" iconSize={24} />
        </Tooltip>
        <Tooltip text="Скрыть информацию об агенте" delay={tooltipDelay}>
          <IconButton icon="sidebar-open" iconSize={24} />
        </Tooltip>
      </div>
    </div>
  )
}
