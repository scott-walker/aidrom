import { restClient } from "@shared/api"
import { toChatSchema } from "../lib/mappers"
import type { Chat } from "../lib/types"

/**
 * Получение списка чатов
 * @namespace Entities.Chat.Api.fetchChats
 */
export const fetchChats = async (): Promise<Chat[]> => {
  const { data } = await restClient.get("chats")

  return data.map(toChatSchema)
}

/**
 * Получение чата по ID
 * @namespace Entities.Chat.Api.fetchChatById
 */
export const fetchChatById = async (chatId: number): Promise<Chat> => {
  const { data } = await restClient.get(`chats/${chatId}`)

  return toChatSchema(data)
}
