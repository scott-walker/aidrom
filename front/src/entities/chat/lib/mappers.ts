import type {
  ChatCreateDTO,
  ChatDTO,
  ChatUpdateDTO,
  MessageDTO,
  MessagePairDTO,
  MessageSendDTO,
  MessageSendResultDTO
} from "./dto"

import {
  Roles,
  type Role,
  type Chat,
  type Message,
  type MessageSendResult,
  type ChatCreateData,
  type ChatUpdateData,
  type ChatListItem
} from "./types"

/**
 * Маппер из сущности в DTO создания чата
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
 * Маппер из сущности в DTO обновления чата
 * @namespace Entities.Chat.Lib.Mappers.toChatUpdateDTO
 */
export const toChatUpdateDTO = (chat: ChatUpdateData): ChatUpdateDTO => {
  return {
    title: chat.title ?? ""
  }
}

/**
 * Маппер из DTO чата в сущность чата
 * @namespace Entities.Chat.Lib.Mappers.toChatSchema
 */
export const toChatSchema = (dto: ChatDTO): Chat => {
  return {
    id: dto.id,
    title: dto.title,
    agentId: dto.agentId,
    agentName: dto.agent.name,
    clientId: dto.clientId,
    clientName: dto.client.name,
    messages: dto.messagePairs.map(fromPairToMessagesSchema).flat(),
    createdAt: dto.createdAt,
    updatedAt: dto.updatedAt
  }
}

/**
 * Маппер из DTO чата в сущность элемента списка чатов
 * @namespace Entities.Chat.Lib.Mappers.toChatListItemSchema
 */
export const toChatListItemSchema = (dto: ChatDTO): ChatListItem => {
  return {
    id: dto.id,
    title: dto.title,
    agentId: dto.agentId,
    clientId: dto.clientId,
    agent: {
      id: dto.agent.id,
      name: dto.agent.name
    },
    createdAt: dto.createdAt,
    updatedAt: dto.updatedAt
  }
}

/**
 * Маппер из DTO сообщения в сущность сообщения
 * @namespace Entities.Chat.Lib.Mappers.toMessageSchema
 */
export const toMessageSchema = (dto: MessageDTO, role: Role): Message => {
  return {
    id: dto.id,
    role,
    content: dto.content,
    createdAt: dto.createdAt
  }
}

/**
 * Маппер из пары сообщений в массив сообщений
 * @namespace Entities.Chat.Lib.Mappers.fromPairToMessagesSchema
 */
export const fromPairToMessagesSchema = ({ clientMessage, agentMessage }: MessagePairDTO): Message[] => {
  return [toMessageSchema(clientMessage, Roles.Client), toMessageSchema(agentMessage, Roles.Agent)]
}

/**
 * Маппер из сущности в DTO отправки сообщения
 * @namespace Entities.Chat.Lib.Mappers.toMessageSendDTO
 */
export const toMessageSendDTO = ({ message }: { message: string }): MessageSendDTO => {
  return {
    message
  }
}

/**
 * Маппер из DTO результата отправки сообщения в сущность чата
 * @namespace Entities.Chat.Lib.Mappers.toMessageSendResultSchema
 */
export const toMessageSendResultSchema = (dto: MessageSendResultDTO): MessageSendResult => {
  return {
    chatId: dto.chatId,
    requestId: dto.requestId,
    messages: [toMessageSchema(dto.clientMessage, Roles.Client), toMessageSchema(dto.agentMessage, Roles.Agent)]
  }
}
