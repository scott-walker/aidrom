import { makeClasses } from "@lib/style-api"
import { pluralize } from "@utils/pluralize"
import { AgentAvatar } from "@entities/agent"
import type { AgentChats } from "../model/schema"
import { ChatList } from "./chat-list"
import { useChatAgentListStore } from "../model/store"

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
  const { openAgentId, setOpenAgentId, unsetOpenAgentId } = useChatAgentListStore()
  const isOpen = openAgentId === agent.id
  const toggleChatList = () => {
    if (isOpen) {
      unsetOpenAgentId()
    } else {
      setOpenAgentId(agent.id)
    }
  }

  const chatsCountText = pluralize(agent.chats.length, ["чат", "чата", "чатов"])
  const containerClasses = makeClasses("flex", "flex-col", "w-full", "select-none", className)
  const agentCardClasses = makeClasses(
    "relative",
    "z-20",
    "flex",
    "items-center",
    "gap-4",
    "px-6",
    "py-4",
    "cursor-pointer",
    "transition-all",
    "duration-200",
    "bg-background-soft",
    "rounded-xl",
    "shadow-md/15",
    !isOpen && "hover:shadow-md/20",
    !isOpen && "hover:scale-107",
    isOpen && "shadow-md/5",
    isOpen && "rounded-b-none"
  )
  const chatListClasses = makeClasses(
    "relative",
    "z-10",
    "grid",
    "transition-all",
    "duration-300",
    "ease-in-out",
    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
  )

  return (
    <div className={containerClasses}>
      <section className={agentCardClasses} onClick={toggleChatList}>
        <AgentAvatar agent={agent} />
        <div className="flex flex-col">
          <h3 className="text-foreground-hard text-base leading-none font-bold">{agent.name}</h3>
          <div className="text-xs text-primary font-bold font-family-display">{agent.provider.name}</div>
          <div className="text-xs text-foreground-soft">
            {agent.chats.length} {chatsCountText}
          </div>
        </div>
      </section>
      <div className={chatListClasses}>
        <div className="overflow-hidden">
          <ChatList chats={agent.chats} />
        </div>
      </div>
    </div>
  )
}
