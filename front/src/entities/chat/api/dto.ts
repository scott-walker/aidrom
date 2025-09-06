import { z } from "zod"

/**
 * Схема для DTO сообщения
 * @namespace Entities.Chat.Api.Dto.MessageDTOSchema
 */
export const MessageDTOSchema = z.object({
  id: z.number(),
  content: z.string(),
  createdAt: z.date(),
  updatedAt: z.date()
})

/**
 * Схема для DTO пары сообщений
 * @namespace Entities.Chat.Api.Dto.MessagePairDTOSchema
 */
export const MessagePairDTOSchema = z.object({
  id: z.number(),
  chatId: z.number(),
  requestId: z.number(),
  clientMessage: MessageDTOSchema,
  agentMessage: MessageDTOSchema,
  createdAt: z.date(),
  updatedAt: z.date()
})

/**
 * Схема для DTO чата
 * @namespace Entities.Chat.Api.Dto.ChatDTOSchema
 */
export const ChatDTOSchema = z.object({
  id: z.number(),
  // agentId: z.number(),
  // clientId: z.number(),
  agent: z.object({
    id: z.number(),
    name: z.string()
  }),
  client: z.object({
    id: z.number(),
    name: z.string()
  }),
  title: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  messagePairs: z.array(MessagePairDTOSchema)
})

/**
 * Тип для DTO сообщения
 * @namespace Entities.Chat.Api.Dto.MessageDTO
 */
export type MessageDTO = z.infer<typeof MessageDTOSchema>

/**
 * Тип для DTO пары сообщений
 * @namespace Entities.Chat.Api.Dto.MessagePairDTO
 */
export type MessagePairDTO = z.infer<typeof MessagePairDTOSchema>

/**
 * Тип для DTO чата
 * @namespace Entities.Chat.Api.Dto.ChatDTO
 */
export type ChatDTO = z.infer<typeof ChatDTOSchema>
