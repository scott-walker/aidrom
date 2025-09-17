import { restClient } from "@shared/api"
import type { Chat, ChatListItem } from "../lib/schema"
import type { ChatCreateData, ChatUpdateData, MessageSendData, MessageSendResult } from "../lib/types"
import {
  toChat,
  toChatListItem,
  toMessageSendResult,
  toChatCreateDTO,
  toChatUpdateDTO,
  toMessageSendDTO
} from "../lib/mappers"

/**
 * Получение списка чатов
 * @namespace Entities.Chat.Api.ChatApi.fetchChats
 */
export const fetchChats = async (): Promise<ChatListItem[]> => {
  const { data: dtos } = await restClient.get("chats")

  return dtos.map(toChatListItem)
}

/**
 * Получение чата по ID
 * @namespace Entities.Chat.Api.ChatApi.fetchChatById
 */
export const fetchChatById = async (chatId: number): Promise<Chat> => {
  const { data: dto } = await restClient.get(`chats/${chatId}`)

  return toChat(dto)
}

/**
 * Создание чата
 * @namespace Entities.Chat.Api.ChatApi.createChat
 */
export const createChat = async (data: ChatCreateData): Promise<Chat> => {
  const { data: dto } = await restClient.post("chats", toChatCreateDTO(data))

  return toChat(dto)
}

/**
 * Обновление чата по ID
 * @namespace Entities.Chat.Api.updateChat
 */
export const updateChat = async (chatId: number, data: ChatUpdateData): Promise<Chat> => {
  const { data: dto } = await restClient.put(`chats/${chatId}`, toChatUpdateDTO(data))

  return toChat(dto)
}

/**
 * Удаление чата по ID
 * @namespace Entities.Chat.Api.deleteChat
 */
export const deleteChat = async (chatId: number): Promise<void> => {
  await restClient.delete(`chats/${chatId}`)
}

/**
 * Отправка сообщения
 * @namespace Entities.Chat.Api.sendMessage
 */
export const sendMessage = async (chatId: number, { message }: MessageSendData): Promise<MessageSendResult> => {
  const { data: dto } = await restClient.post(`chats/${chatId}/send`, toMessageSendDTO({ message }))

  return toMessageSendResult(dto)
}
