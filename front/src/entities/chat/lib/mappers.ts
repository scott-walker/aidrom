import type { ChatDTO, MessagePairDTO } from "./dto"
import { type Chat, type Message, Roles } from "./types"

/**
 * Маппер из DTO в сущность
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
 * Маппер из пары сообщений в массив сообщений
 * @namespace Entities.Chat.Lib.Mappers.fromPairToMessagesSchema
 */
export const fromPairToMessagesSchema = ({ clientMessage, agentMessage }: MessagePairDTO): Message[] => {
  const messages: Message[] = []

  messages.push({
    id: clientMessage.id,
    content: clientMessage.content,
    role: Roles.Client,
    createdAt: clientMessage.createdAt
  })
  messages.push({
    id: agentMessage.id,
    content: agentMessage.content,
    role: Roles.Agent,
    createdAt: agentMessage.createdAt
  })

  return messages
}
