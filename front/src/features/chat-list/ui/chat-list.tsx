import { makeClasses } from "@lib/style-api"
import { LoaderBlock } from "@ui/loader-block"
import { ChatAgentCard } from "./chat-agent-card"
import { useAgentChats } from "../lib/use-agent-chats"
import { useMemo } from "react"

/**
 * Список чатов
 * @namespace Features.ChatList
 */
export const ChatList = () => {
  const { agentChats, isLoading } = useAgentChats()
  const containerClasses = makeClasses("flex", "flex-col", "gap-3", "px-(--layout-inner-offset-x)", "pt-2", "pb-8")

  const agentChatsList = useMemo(
    () => agentChats.map(agentChat => <ChatAgentCard key={agentChat.id} agent={agentChat} />),
    [agentChats]
  )

  if (isLoading) {
    return (
      <div className={containerClasses}>
        <LoaderBlock />
      </div>
    )
  }

  return <div className={containerClasses}>{agentChatsList}</div>
}
