// import type { AgentListItemDTO } from "@entities/agent"
import type { Roles } from "./constants"

/**
 * DTO сообщения
 * @namespace Entities.Chat.Model.MessageDTO
 */
export interface MessageDTO {
  id: number
  content: string
  createdAt: Date
  updatedAt: Date
}

/**
 * DTO пары сообщений
 * @namespace Entities.Chat.Model.MessagePairDTO
 */
export interface MessagePairDTO {
  id: number
  chatId: number
  requestId: number
  clientMessage: MessageDTO
  agentMessage: MessageDTO
  createdAt: string
  updatedAt: string
}

/**
 * DTO контекста чата
 * @namespace Entities.Chat.Model.ChatContextDTO
 */
export interface ChatContextItemDTO {
  role: Roles
  content: string
}

/**
 * DTO чата
 * @namespace Entities.Chat.Model.ChatDTO
 */
export interface ChatDTO {
  id: number
  agentId: number
  clientId: number
  title: string
  context: ChatContextItemDTO[]
  // agent: AgentDTO
  // client: ClientDTO
  messagePairs: MessagePairDTO[]
  createdAt: string
  updatedAt: string
}

/**
 * DTO элемента списка чатов
 * @namespace Entities.Chat.Model.ChatListItemDTO
 */
export interface ChatListItemDTO {
  id: number
  title: string
  agentId: number
  clientId: number
  createdAt: string
  updatedAt: string
}

/**
 * DTO создания чата
 * @namespace Entities.Chat.Model.ChatCreateDTO
 */
export interface ChatCreateDTO {
  agentId: number
  clientId: number
  title: string
}

/**
 * DTO обновления чата
 * @namespace Entities.Chat.Model.ChatUpdateDTO
 */
export interface ChatUpdateDTO {
  title: string
}

/**
 * DTO отправки сообщения
 * @namespace Entities.Chat.Model.MessageSendDTO
 */
export interface MessageSendDTO {
  message: string
}

/**
 * DTO результата отправки сообщения
 * @namespace Entities.Chat.Model.MessageSendResultDTO
 */
export interface MessageSendResultDTO {
  chatId: number
  requestId: number
  clientMessage: MessageDTO
  agentMessage: MessageDTO
}
