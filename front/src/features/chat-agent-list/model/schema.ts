import type { ChatListItem } from "@entities/chat"
import type { Agent } from "@entities/agent"

/**
 * Агент с чатами
 * @namespace Features.ChatAgentList.Model.AgentChats
 */
export interface AgentChats extends Agent {
  chats: ChatListItem[]
}
