import type { Agent } from "@entities/agent"
// import type { Client } from "@entities/client"

/**
 * Роли отправляющих сообщения
 * @namespace Entities.Chat.Lib.Schema.Roles
 */
export enum Roles {
  Client = "client",
  Agent = "agent"
}

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
 * Чат
 * @namespace Entities.Chat.Lib.Schema.Chat
 */
export interface Chat {
  id: number
  title: string
  agentId: number
  clientId: number
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
export interface ChatListItem extends Omit<Chat, "messages"> {
  agent: Agent | null
}

/**
 * Чат с агентом
 * @namespace Entities.Chat.Lib.Schema.ChatWithAgent
 */
export interface ChatWithAgent extends Chat {
  agent: Agent | null
}
