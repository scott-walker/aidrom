import type {
  ChatDTO,
  ChatListItemDTO,
  ChatCreateDTO,
  ChatUpdateDTO,
  MessageDTO,
  MessagePairDTO,
  MessageSendDTO,
  MessageSendResultDTO
} from "./dto"
import { Roles, type Chat, type Message, type ChatListItem } from "./schema"
import type { ChatCreateData, ChatUpdateData, MessageSendData, MessageSendResult } from "./types"

import { toAgent } from "@entities/agent"
// import { toClient } from "@entities/client"

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
    // agent: toAgent(dto.agent),
    // client: toClient(dto.client),
    messages: dto.messagePairs.map(fromPairToMessages).flat(),
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
    agent: toAgent({ ...dto.agent, rules: [] }),
    createdAt: new Date(dto.createdAt),
    updatedAt: new Date(dto.updatedAt)
  }
}

/**
 * Маппер из DTO сообщения в сущность сообщения
 * @namespace Entities.Chat.Lib.Mappers.toMessage
 */
export const toMessage = (dto: MessageDTO, role: Roles): Message => {
  return {
    id: crypto.randomUUID(),
    role,
    content: dto.content,
    createdAt: new Date(dto.createdAt)
  }
}

/**
 * Маппер из пары сообщений в кортеж сообщений
 * @namespace Entities.Chat.Lib.Mappers.fromPairToMessages
 */
export const fromPairToMessages = ({ clientMessage, agentMessage }: MessagePairDTO): Message[] => {
  return [toMessage(clientMessage, Roles.Client), toMessage(agentMessage, Roles.Agent)]
}

/**
 * Маппер из DTO результата отправки сообщения в сущность чата
 * @namespace Entities.Chat.Lib.Mappers.toMessageSendResult
 */
export const toMessageSendResult = (dto: MessageSendResultDTO): MessageSendResult => {
  return {
    chatId: dto.chatId,
    requestId: dto.requestId,
    messages: fromPairToMessages({
      clientMessage: dto.clientMessage,
      agentMessage: dto.agentMessage
    } as MessagePairDTO)
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
