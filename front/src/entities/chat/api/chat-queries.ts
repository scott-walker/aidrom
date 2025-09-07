import { useQuery } from "@tanstack/react-query"
import { fetchChatById, fetchChats } from "./chat-api"
import type { ChatsQueryData, ChatQueryData } from "../lib/types"

/**
 * Ключи инвалидации для чатов
 * @namespace Entities.Chat.Api.Queries.queryKeys
 */
const queryKeys = {
  all: ["chats"] as const,
  list: (filters: Record<string, string>) => [...queryKeys.all, "list", filters] as const,
  details: (id: number) => [...queryKeys.all, "details", id.toString()] as const
}

// 5 минут кеша
const STALE_TIME = 300000

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
    staleTime: STALE_TIME
  })

  return { chats, isLoading, error }
}

/**
 * Хук для запроса чата по ID
 * @namespace Entities.Chat.Api.Queries.useChatById
 */
export const useChatById = (chatId: number): ChatQueryData => {
  const {
    data: chat,
    isLoading,
    error
  } = useQuery({
    queryKey: queryKeys.details(chatId),
    queryFn: () => fetchChatById(chatId)
  })

  if (!chat) {
    throw new Error(`Чат #${chatId} не найден`)
  }

  return { chat, isLoading, error }
}
