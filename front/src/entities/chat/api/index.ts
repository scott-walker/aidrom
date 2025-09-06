import { restClient } from "@shared/api"
import { toChatSchema } from "../lib/mappers"

/**
 * Получение списка чатов
 * @namespace Entities.Chat.Api.FetchChats
 */
export const fetchChats = async () => {
  const { data } = await restClient.get("chats")

  return data.map(toChatSchema)
}

/**
 * Получение чата по ID
 * @namespace Entities.Chat.Api.FetchChat
 */
export const fetchChat = async (id: number) => {
  const { data } = await restClient.get(`chats/${id}`)

  return toChatSchema(data)
}
