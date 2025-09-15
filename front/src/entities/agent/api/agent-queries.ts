import { useQuery } from "@tanstack/react-query"
import type { RestError } from "@shared/api"
import { fetchAgentById, fetchAgents } from "./agent-api"
import type { AgentListQueryData, AgentDetailQueryData } from "../lib/types"

/**
 * Ключ запроса для агентов
 * @namespace Entities.Agent.Api.AGENT_QUERY_KEY
 */
export const AGENT_QUERY_KEY = "agent"

/**
 * Ключи инвалидации для агентов
 * @namespace Entities.Agent.Api.queryKeys
 */
export const queryKeys = {
  all: [AGENT_QUERY_KEY] as const,
  list: (filters: Record<string, string>) => [AGENT_QUERY_KEY, "list", filters] as const,
  details: (id: number) => [AGENT_QUERY_KEY, id] as const
}

// 5 минут кеша для списка агентов
export const STALE_AGENTS_TIME = 300000
// 5 минут кеша для агента по ID
export const STALE_AGENT_BY_ID_TIME = 300000

/**
 * Получить список агентов
 * @namespace Entities.Agent.Api.useAgents
 */
export const useAgents = (): AgentListQueryData => {
  const { data, isLoading, error } = useQuery({
    queryKey: queryKeys.list({}),
    queryFn: fetchAgents,
    staleTime: STALE_AGENTS_TIME
  })

  return {
    agents: data || [],
    isLoading,
    error: error as RestError | null
  }
}

/**
 * Получить агента по ID
 * @namespace Entities.Agent.Api.useAgentById
 */
export const useAgentById = (id: number): AgentDetailQueryData => {
  const { data, isLoading, error } = useQuery({
    queryKey: queryKeys.details(id),
    queryFn: () => fetchAgentById(id),
    enabled: !!id
  })

  return {
    agent: data || null,
    isLoading,
    error: error as RestError | null
  }
}
