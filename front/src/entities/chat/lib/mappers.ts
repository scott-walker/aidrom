import { Roles } from "./constants"
import type {
  ChatDTO,
  ChatListItemDTO,
  ChatCreateDTO,
  ChatUpdateDTO,
  MessagePairDTO,
  MessageSendDTO,
  MessageSendResultDTO
} from "./dto"
import { type Chat, type ChatListItem, type Message } from "./schema"
import type { ChatCreateData, ChatUpdateData, MessageSendData, MessageSendResult } from "./types"

/**
 * Маппер из DTO в сущность чата
 * @namespace Entities.Chat.Lib.Mappers.toChat
 */
export const toChat = (dto: ChatDTO): Chat => {
  return {
    id: dto.id,
    title: dto.title,
    agentId: dto.agentId,
    clientId: dto.clientId,
    context: dto.context,
    messages: dto.messagePairs.map(toMessages).flat(),
    createdAt: new Date(dto.createdAt),
    updatedAt: new Date(dto.updatedAt)
  }
}

/**
 * Маппер из DTO чата в сущность элемента списка чатов
 * @namespace Entities.Chat.Lib.Mappers.toChatListItem
 */
export const toChatListItem = (dto: ChatListItemDTO): ChatListItem => {
  return {
    id: dto.id,
    title: dto.title,
    agentId: dto.agentId,
    clientId: dto.clientId,
    createdAt: new Date(dto.createdAt),
    updatedAt: new Date(dto.updatedAt)
  }
}

/**
 * Маппер из DTO сообщения в сущность сообщения
 * @namespace Entities.Chat.Lib.Mappers.toMessage
 */
export const toMessages = (dto: MessagePairDTO): Message[] => {
  return [
    {
      id: crypto.randomUUID(),
      chatId: dto.chatId,
      role: Roles.Client,
      content: dto.clientMessage,
      createdAt: new Date(dto.createdAt)
    },
    {
      id: crypto.randomUUID(),
      chatId: dto.chatId,
      role: Roles.Agent,
      content: dto.agentMessage,
      createdAt: new Date(dto.createdAt)
    }
  ]
}

/**
 * Маппер из DTO результата отправки сообщения в сущность чата
 * @namespace Entities.Chat.Lib.Mappers.toMessageSendResult
 */
export const toMessageSendResult = (dto: MessageSendResultDTO): MessageSendResult => {
  return {
    chatId: dto.chatId,
    requestId: dto.requestId,
    messages: toMessages(dto)
  }
}

/**
 * Маппер из данных запроса в DTO создания чата
 * @namespace Entities.Chat.Lib.Mappers.toChatCreateDTO
 */
export const toChatCreateDTO = (chat: ChatCreateData): ChatCreateDTO => {
  return {
    agentId: chat.agentId,
    clientId: chat.clientId,
    title: chat.title
  }
}

/**
 * Маппер из данных запроса в DTO обновления чата
 * @namespace Entities.Chat.Lib.Mappers.toChatUpdateDTO
 */
export const toChatUpdateDTO = (chat: ChatUpdateData): ChatUpdateDTO => {
  return {
    title: chat.title ?? ""
  }
}

/**
 * Маппер из данных запроса в DTO отправки сообщения
 * @namespace Entities.Chat.Lib.Mappers.toMessageSendDTO
 */
export const toMessageSendDTO = ({ message }: MessageSendData): MessageSendDTO => {
  return {
    message
  }
}
