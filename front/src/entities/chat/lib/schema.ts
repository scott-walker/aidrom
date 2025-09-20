import type { Roles } from "./constants"

/**
 * Сообщение
 * @namespace Entities.Chat.Lib.Schema.Message
 */
export interface Message {
  id: string
  chatId: number
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
  messages: Message[]
  createdAt: Date
  updatedAt: Date
}

/**
 * Элемент списка чатов
 * @namespace Entities.Chat.Lib.Schema.ChatListItem
 */
export interface ChatListItem {
  id: number
  title: string
  agentId: number
  clientId: number
  createdAt: Date
  updatedAt: Date
}
