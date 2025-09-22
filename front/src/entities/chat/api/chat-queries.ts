import { useQuery } from "@tanstack/react-query"
import type { RestError } from "@features/provider-form/model/api"
// import { useAgents } from "@entities/agent"
import type { ChatListQueryData, ChatDetailQueryData } from "../lib/types"
import { fetchChatById, fetchChats } from "./chat-api"

/**
 * Ключ запроса списка чатов
 * @namespace Entities.Chat.Api.Queries.CHATS_QUERY_KEY
 */
const CHATS_QUERY_KEY = "chats"

// 5 минут кеша для списка чатов
const STALE_CHATS_TIME = 300000
// 5 минут кеша для чата по ID
// const STALE_CHAT_BY_ID_TIME = 300000

/**
 * Ключи инвалидации для чатов
 * @namespace Entities.Chat.Api.Queries.queryKeys
 */
export const queryKeys = {
  all: [CHATS_QUERY_KEY] as const,
  list: (filters: Record<string, string>) => [...queryKeys.all, "list", filters] as const,
  details: (id: number) => [...queryKeys.all, "details", id.toString()] as const
}

/**
 * Хук для запроса списка чатов
 * @namespace Entities.Chat.Api.Queries.useChats
 */
export const useChats = (): ChatListQueryData => {
  const { data, isLoading, error } = useQuery({
    queryKey: queryKeys.list({}),
    queryFn: fetchChats,
    staleTime: STALE_CHATS_TIME
  })

  return {
    chats: data ?? [],
    isLoading,
    error: error as RestError | null
  }
}

// /**
//  * Хук для запроса списка чатов с агентами
//  * @namespace Entities.Chat.Api.Queries.useChatsWithAgents
//  */
// export const useChatsWithAgents = (): ChatListQueryData => {
//   const { chats, isLoading: isChatsLoading, error: chatsError } = useChats()
//   const { agents, isLoading: isAgentsLoading, error: agentsError } = useAgents()

//   return {
//     chats: chats.map(chat => {
//       const agent = agents.find(agent => agent.id === chat.agentId)

//       return {
//         ...chat,
//         agent: agent ?? null
//       }
//     }),
//     isLoading: isChatsLoading || isAgentsLoading,
//     error: chatsError || agentsError
//   }
// }

/**
 * Хук для запроса чата по ID
 * @namespace Entities.Chat.Api.Queries.useChatById
 */
export const useChatById = (chatId: number): ChatDetailQueryData => {
  const { data, isLoading, error, refetch } = useQuery({
    // queryKey: queryKeys.details(chatId),
    queryKey: queryKeys.details(chatId),
    queryFn: () => fetchChatById(chatId),
    enabled: !!chatId
    // staleTime: STALE_CHAT_BY_ID_TIME
  })

  return {
    chat: data ?? null,
    isLoading,
    error: error as RestError | null,
    refetch
  }
}
