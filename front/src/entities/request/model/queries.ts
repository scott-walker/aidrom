import { useQuery } from "@tanstack/react-query"
import type { RequestsQueryData, RequestQueryData } from "../lib/types"
import { fetchRequestsByProviderId, fetchRequests } from "../api"
import { queryKeys } from "../lib/keys"
import type { RestError } from "@shared/api/rest-error"

// 5 минут кеша
const STALE_TIME = 300_000

/**
 * Хук для списка "запросов к провайдерам"
 * @namespace Entities.Request.Model.Queries.useRequests
 */
export const useRequests = (): RequestsQueryData => {
  const {
    data: requests = [],
    isLoading,
    error
  } = useQuery({
    queryKey: queryKeys.list({}),
    queryFn: fetchRequests,
    staleTime: STALE_TIME
  })

  return { requests, isLoading, error: error as RestError | null }
}

/**
 * Хук для "запроса к провайдеру" по ID
 * @namespace Entities.Request.Model.Queries.useRequestById
 */
export const useRequestById = (requestId: number | null): RequestQueryData => {
  const {
    data: request = null,
    isLoading,
    error
  } = useQuery({
    queryKey: queryKeys.details(requestId || 0),
    queryFn: () => fetchRequestsByProviderId(requestId || 0),
    staleTime: STALE_TIME,
    enabled: requestId !== null
  })

  return { request, isLoading, error: error as RestError | null }
}
