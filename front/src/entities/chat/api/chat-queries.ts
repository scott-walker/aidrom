import { useQuery } from "@tanstack/react-query"
import { fetchChatById, fetchChats } from "./chat-api"
import type { ChatsQueryData, ChatQueryData } from "../lib/types"

// 5 минут кеша для списка чатов
const STALE_CHATS_TIME = 300000
// 5 минут кеша для чата по ID
const STALE_CHAT_BY_ID_TIME = 300000

/**
 * Ключи инвалидации для чатов
 * @namespace Entities.Chat.Api.Queries.queryKeys
 */
export const queryKeys = {
  all: ["chats"] as const,
  list: (filters: Record<string, string>) => [...queryKeys.all, "list", filters] as const,
  details: (id: number) => [...queryKeys.all, "details", id.toString()] as const
}

/**
 * Хук для запроса списка чатов
 * @namespace Entities.Chat.Api.Queries.useChats
 */
export const useChats = (): ChatsQueryData => {
  const {
    data: chats = [],
    isLoading,
    error
  } = useQuery({
    queryKey: queryKeys.list({}),
    queryFn: fetchChats,
    staleTime: STALE_CHATS_TIME
  })

  return { chats, isLoading, error }
}

/**
 * Хук для запроса чата по ID
 * @namespace Entities.Chat.Api.Queries.useChatById
 */
export const useChatById = (chatId: number): ChatQueryData => {
  const {
    data: chat = null,
    isLoading,
    error
  } = useQuery({
    queryKey: queryKeys.details(chatId),
    queryFn: () => fetchChatById(chatId),
    staleTime: STALE_CHAT_BY_ID_TIME
  })

  return { chat, isLoading, error }
}
