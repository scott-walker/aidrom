/**
 * Роли отправляющих сообщения
 * @namespace Entities.Chat.Lib.Types.Roles
 */
export const Roles = {
  Client: "client",
  Agent: "agent"
} as const

/**
 * Роли отправляющих сообщения
 * @namespace Entities.Chat.Lib.Types.Role
 */
export type Role = (typeof Roles)[keyof typeof Roles]

/**
 * Сообщение
 * @namespace Entities.Chat.Lib.Types.Message
 */
export type Message = {
  id: number
  content: string
  role: Role
  createdAt: Date
}

/**
 * Агент
 * @namespace Entities.Chat.Lib.Types.Agent
 */
export type Agent = {
  id: number
  name: string
}

/**
 * Клиент
 * @namespace Entities.Chat.Lib.Types.Client
 */
export type Client = {
  id: number
  name: string
}

/**
 * Чат
 * @namespace Entities.Chat.Lib.Types.Chat
 */
export type Chat = {
  id: number
  title: string
  agent: Agent
  client: Client
  messages: Message[]
  createdAt: Date
  updatedAt: Date
}

/**
 * Данные запроса списка чатов
 * @namespace Entities.Chat.Lib.Types.ChatsQueryData
 */
export type ChatsQueryData = {
  chats: Chat[]
  isLoading: boolean
  error: Error | null
}
