import { useState } from "react"
import { makeClasses } from "@lib/style-api"
import { pluralize } from "@utils/pluralize"
import { AgentAvatar } from "@entities/agent"
import type { AgentChats } from "../model/schema"
import { ChatList } from "./chat-list"

/**
 * Пропсы карточки агента с чатами
 * @namespace Features.ChatCard.UI.ChatCardProps
 */
type ChatAgentCardProps = {
  agent: AgentChats
  className?: string
}

/**
 * Карточка агента с чатами
 * @namespace Features.ChatAgentList.UI.ChatAgentCard
 */
export const ChatAgentCard = ({ agent, className = "" }: ChatAgentCardProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const toggleChatList = () => setIsOpen(!isOpen)

  const chatsCountText = pluralize(agent.chats.length, ["чат", "чата", "чатов"])

  const containerClasses = makeClasses("flex", "flex-col", "w-full", className)
  const agentCardClasses = makeClasses(
    "flex",
    "items-center",
    "border-b",
    "border-background-hard/70",
    "gap-4",
    "px-6",
    "py-4",
    "cursor-pointer",
    "transition-colors",
    "duration-200",
    "hover:bg-background-soft/70",
    isOpen && "bg-background-soft/70"
    // "hover:bg-background-hard/50",
    // isOpen && "bg-background-hard/50"
  )

  return (
    <div className={containerClasses}>
      <section className={agentCardClasses} onClick={toggleChatList}>
        <AgentAvatar agent={agent} />
        <div className="flex flex-col">
          <h3 className="text-foreground-hard text-base leading-none font-family-display">{agent.name}</h3>
          <div className="text-xs text-primary font-bold">{agent.provider.name}</div>
          <div className="text-xs text-foreground-soft">
            {agent.chats.length} {chatsCountText}
          </div>
        </div>
      </section>
      <ChatList chats={agent.chats} className={isOpen ? "block" : "hidden"} />
    </div>
  )
}
