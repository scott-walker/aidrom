import { useMemo } from "react"
import { useChats } from "@entities/chat"
import { useAgents } from "@entities/agent"
import type { AgentChats } from "../model/schema"

/**
 * Хук для получения чатов по агентам
 * @namespace Widgets.ChatList.Lib.useAgentChats
 */
export const useAgentChats = () => {
  const { agents, isLoading: isAgentsLoading, error: agentsError } = useAgents()
  const { chats, isLoading: isChatsLoading, error: chatsError } = useChats()

  const agentChats: AgentChats[] = useMemo(() => {
    return agents.map(agent => ({
      ...agent,
      chats: chats.filter(chat => chat.agentId === agent.id)
    }))
  }, [agents, chats])

  return {
    agentChats,
    isLoading: isAgentsLoading || isChatsLoading,
    error: agentsError || chatsError
  }
}
