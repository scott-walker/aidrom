import { makeClasses } from "@lib/style-api"
import { DateTag } from "@ui/date-tag"
import type { ChatListItem } from "../lib/schema"
import { AgentAvatar, type Agent } from "@entities/agent"

/**
 * Пропсы для компонента ChatCard
 * @namespace Entities.Chat.UI.ChatCard.Props
 */
type ChatCardProps = {
  chat: ChatListItem
  className?: string
}

/**
 * Элемент списка чатов
 * @namespace Entities.Chat.UI.ChatCard
 */
export const ChatCard = ({ chat, className = "" }: ChatCardProps) => {
  const cardClasses = makeClasses(
    "flex",
    "items-center",
    "px-6",
    "py-6",
    "border-b",
    "border-background-hard",
    "gap-4",
    "group",
    className
  )

  return (
    <div className={cardClasses}>
      <AgentAvatar agent={chat.agent as Agent} />
      <div className="flex flex-col">
        <h3 className="text-foreground-hard text-lg leading-none group-hover:text-primary">{chat.title}</h3>
        <DateTag date={chat.updatedAt} />
      </div>
    </div>
  )
}
