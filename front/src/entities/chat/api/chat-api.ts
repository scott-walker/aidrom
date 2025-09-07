import { restClient } from "@shared/api"
import {
  toChatCreateDTO,
  toChatUpdateDTO,
  toMessageSendDTO,
  toChatSchema,
  toChatListItemSchema,
  toMessageSendResultSchema
} from "../lib/mappers"
import type { Chat, ChatCreateData, ChatUpdateData, MessageSendData, MessageSendResult } from "../lib/types"

/**
 * Получение списка чатов
 * @namespace Entities.Chat.Api.ChatApi.fetchChats
 */
export const fetchChats = async (): Promise<Chat[]> => {
  const { data } = await restClient.get("chats")

  return data.map(toChatListItemSchema)
}

/**
 * Получение чата по ID
 * @namespace Entities.Chat.Api.ChatApi.fetchChatById
 */
export const fetchChatById = async (chatId: number): Promise<Chat> => {
  const { data } = await restClient.get(`chats/${chatId}`)

  return toChatSchema(data)
}

/**
 * Создание чата
 * @namespace Entities.Chat.Api.ChatApi.createChat
 */
export const createChat = async (chat: ChatCreateData): Promise<Chat> => {
  const { data } = await restClient.post("chats", toChatCreateDTO(chat))

  return toChatSchema(data)
}

/**
 * Обновление чата по ID
 * @namespace Entities.Chat.Api.updateChat
 */
export const updateChat = async (chatId: number, chat: ChatUpdateData): Promise<Chat> => {
  const { data } = await restClient.put(`chats/${chatId}`, toChatUpdateDTO(chat))

  return toChatSchema(data)
}

/**
 * Отправка сообщения
 * @namespace Entities.Chat.Api.sendMessage
 */
export const sendMessage = async (chatId: number, { message }: MessageSendData): Promise<MessageSendResult> => {
  const { data } = await restClient.post(`chats/${chatId}/send`, toMessageSendDTO({ message }))

  return toMessageSendResultSchema(data)
}
