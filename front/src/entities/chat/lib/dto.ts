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
  agentId: z.number(),
  clientId: z.number(),
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
 * Схема для DTO создания чата
 * @namespace Entities.Chat.Api.Dto.ChatCreateDTOSchema
 */
export const ChatCreateDTOSchema = z.object({
  agentId: z.number(),
  clientId: z.number(),
  title: z.string()
})

/**
 * Схема для DTO обновления чата
 * @namespace Entities.Chat.Api.Dto.ChatUpdateDTOSchema
 */
export const ChatUpdateDTOSchema = z.object({
  title: z.string()
})

/**
 * Схема для DTO отправки сообщения
 * @namespace Entities.Chat.Api.Dto.MessageSendDTOSchema
 */
export const MessageSendDTOSchema = z.object({
  message: z.string()
})

/**
 * Схема для DTO результата отправки сообщения
 * @namespace Entities.Chat.Api.Dto.MessageSendResultDTOSchema
 */
export const MessageSendResultDTOSchema = z.object({
  chatId: z.number(),
  requestId: z.number(),
  clientMessage: MessageDTOSchema,
  agentMessage: MessageDTOSchema
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

/**
 * Тип для DTO создания чата
 * @namespace Entities.Chat.Api.Dto.ChatCreateDTO
 */
export type ChatCreateDTO = z.infer<typeof ChatCreateDTOSchema>

/**
 * Тип для DTO обновления чата
 * @namespace Entities.Chat.Api.Dto.ChatUpdateDTO
 */
export type ChatUpdateDTO = z.infer<typeof ChatUpdateDTOSchema>

/**
 * Тип для DTO отправки сообщения
 * @namespace Entities.Chat.Api.Dto.MessageSendDTO
 */
export type MessageSendDTO = z.infer<typeof MessageSendDTOSchema>

/**
 * Тип для DTO результата отправки сообщения
 * @namespace Entities.Chat.Api.Dto.MessageSendResultDTO
 */
export type MessageSendResultDTO = z.infer<typeof MessageSendResultDTOSchema>
