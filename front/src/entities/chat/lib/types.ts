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
  role: Role
  content: string
  createdAt: Date
}

/**
 * Чат
 * @namespace Entities.Chat.Lib.Types.Chat
 */
export type Chat = {
  id: number
  title: string
  agentId: number
  agentName: string
  clientId: number
  clientName: string
  messages: Message[]
  createdAt: Date
  updatedAt: Date
}

/**
 * Элемент списка чатов
 * @namespace Entities.Chat.Lib.Types.ChatListItem
 */
export type ChatListItem = {
  id: number
  title: string
  agentId: number
  clientId: number
  createdAt: Date
  updatedAt: Date
}

/**
 * Данные для создания чата
 * @namespace Entities.Chat.Lib.Types.CreateChat
 */
export type ChatCreateData = {
  agentId: number
  clientId: number
  title: string
}

/**
 * Данные для обновления чата
 * @namespace Entities.Chat.Lib.Types.ChatUpdateData
 */
export type ChatUpdateData = {
  title: string
}

/**
 * Данные для отправки сообщения
 * @namespace Entities.Chat.Lib.Types.MessageSendData
 */
export type MessageSendData = {
  message: string
}

/**
 * Результат отправки сообщения
 * @namespace Entities.Chat.Lib.Types.MessageSendResult
 */
export type MessageSendResult = {
  chatId: number
  requestId: number
  messages: Message[]
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

/**
 * Данные запроса чата
 * @namespace Entities.Chat.Lib.Types.ChatQueryData
 */
export type ChatQueryData = {
  chat: Chat | undefined | null
  isLoading: boolean
  error: Error | null
}
