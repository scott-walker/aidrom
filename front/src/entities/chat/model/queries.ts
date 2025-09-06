import { useQuery } from "@tanstack/react-query"
import { queryKeys } from "../lib/keys"
import { fetchChats } from "../api"
import { type ChatsQueryData } from "../lib/types"

// 5 минут кеша
const STALE_TIME = 300000

/**
 * Хук для запроса списка чатов
 * @namespace Entities.Chat.Model.Queries.useChats
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
