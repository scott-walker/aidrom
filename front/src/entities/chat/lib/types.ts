import type { RestError } from "@shared/api"
import type { Message, Chat } from "./schema"

/**
 * Элемент списка чатов
 * @namespace Entities.Chat.Lib.Types.ChatListItem
 */
export type ChatListItem = Omit<Chat, "client" | "messages">

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
 * @namespace Entities.Chat.Lib.Types.ChatListQueryData
 */
export type ChatListQueryData = {
  chats: ChatListItem[]
  isLoading: boolean
  error: RestError | null
}

/**
 * Данные запроса одного чата
 * @namespace Entities.Chat.Lib.Types.ChatDetailQueryData
 */
export type ChatDetailQueryData = {
  chat: Chat | null
  isLoading: boolean
  error: RestError | null
}
