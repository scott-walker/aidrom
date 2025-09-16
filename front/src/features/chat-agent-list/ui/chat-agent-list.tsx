import { makeClasses } from "@lib/style-api"
import { LoaderBlock } from "@ui/loader-block"
import { ErrorBlock } from "@ui/error-block"
import { ChatAgentCard } from "./chat-agent-card"
import { useAgentChats } from "../lib/use-agent-chats"

/**
 * Список чатов по агентам
 * @namespace Features.ChatAgentList
 */
export const ChatAgentList = () => {
  const { agentChats, isLoading, error } = useAgentChats()
  const containerClasses = makeClasses("flex", "flex-col", "gap-3", "px-6", "py-2", "h-full")

  if (isLoading) {
    return (
      <div className={containerClasses}>
        <LoaderBlock />
      </div>
    )
  }
  if (error) {
    return (
      <div className={containerClasses}>
        <ErrorBlock error={error} />
      </div>
    )
  }

  return (
    <div className={containerClasses}>
      {agentChats.map(agentChat => (
        <ChatAgentCard key={agentChat.id} agent={agentChat} />
      ))}
    </div>
  )
}
