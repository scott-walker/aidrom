import type { Agent } from "@entities/agent"
// import type { Client } from "@entities/client"
import type { Roles } from "./constants"
/**
 * Сообщение
 * @namespace Entities.Chat.Lib.Schema.Message
 */
export interface Message {
  id: string
  role: Roles
  content: string
  createdAt: Date
}

/**
 * Элемент контекста чата
 * @namespace Entities.Chat.Lib.Schema.ChatContextItem
 */
export interface ChatContextItem {
  role: Roles
  content: string
}

/**
 * Чат
 * @namespace Entities.Chat.Lib.Schema.Chat
 */
export interface Chat {
  id: number
  title: string
  agentId: number
  clientId: number
  context: ChatContextItem[]
  // agent: Agent
  // client: Client
  messages: Message[]
  createdAt: Date
  updatedAt: Date
}

/**
 * Элемент списка чатов
 * @namespace Entities.Chat.Lib.Schema.ChatListItem
 */
export interface ChatListItem extends Omit<Chat, "messages" | "context"> {
  agent: Agent | null
}

/**
 * Чат с агентом
 * @namespace Entities.Chat.Lib.Schema.ChatWithAgent
 */
export interface ChatWithAgent extends Chat {
  agent: Agent | null
}
