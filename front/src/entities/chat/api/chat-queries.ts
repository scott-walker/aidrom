import { useQuery } from "@tanstack/react-query"
import type { RestError } from "@shared/api"
import type { ChatListQueryData, ChatDetailQueryData, ChatMessagesQueryData } from "../lib/types"
import { fetchChatById, fetchChats } from "./chat-api"

/**
 * Ключ запроса списка чатов
 * @namespace Entities.Chat.Api.Queries.CHATS_QUERY_KEY
 */
const CHATS_QUERY_KEY = "chats"

/**
 * Ключи инвалидации для чатов
 * @namespace Entities.Chat.Api.Queries.queryKeys
 */
export const queryKeys = {
  all: [CHATS_QUERY_KEY] as const,
  list: [CHATS_QUERY_KEY, "list"] as const,
  details: (id: number) => [...queryKeys.all, "details", id.toString()] as const,
  messages: (id: number) => [...queryKeys.all, "messages", id.toString()] as const
}

/**
 * Хук для запроса списка чатов
 * @namespace Entities.Chat.Api.Queries.useChats
 */
export const useChats = (): ChatListQueryData => {
  const { data, isLoading, error } = useQuery({
    queryKey: queryKeys.list,
    queryFn: fetchChats
  })

  return {
    chats: data ?? [],
    isLoading,
    error: error as RestError | null
  }
}

/**
 * Хук для запроса чата по ID
 * @namespace Entities.Chat.Api.Queries.useChatById
 */
export const useChatById = (chatId: number): ChatDetailQueryData => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: queryKeys.details(chatId),
    queryFn: () => fetchChatById(chatId),
    enabled: !!chatId
  })

  return {
    chat: data ?? null,
    isLoading,
    error: error as RestError | null,
    refetch
  }
}

/**
 * Хук для получения сообщений чата
 * @namespace Entities.Chat.Api.Queries.useChatMessages
 */
export const useChatMessages = (chatId: number): ChatMessagesQueryData => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: queryKeys.messages(chatId),
    queryFn: async () => {
      const chat = await fetchChatById(chatId)

      return chat.messages ?? []
    },
    enabled: !!chatId
  })

  return {
    messages: data ?? [],
    isLoading,
    error: error as RestError | null,
    refetch
  }
}
