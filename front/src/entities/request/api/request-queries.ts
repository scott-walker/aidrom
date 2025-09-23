import { useQuery } from "@tanstack/react-query"
import type { RequestListQueryData, RequestDetailQueryData } from "../lib/types"
import { fetchRequestsByProviderId, fetchRequests } from "./request-api"
import type { RestError } from "@shared/api/rest-error"
import type { RequestsFilterData } from "../lib/dto"

/**
 * Ключ запроса для записей запросов к провайдерам
 * @namespace Entities.Request.Lib.REQUEST_QUERY_KEY
 */
const REQUEST_QUERY_KEY = "request"

/**
 * Ключи запросов для записей запросов к провайдерам
 * @namespace Entities.Request.Lib.QueryKeys
 */
export const queryKeys = {
  all: [REQUEST_QUERY_KEY] as const,
  list: (filters: RequestsFilterData) => [...queryKeys.all, "list", filters] as const,
  // list: () => [...queryKeys.all, "list"] as const,
  details: (id: number) => [...queryKeys.all, "details", id] as const
}

/**
 * Хук для списка "запросов к провайдерам"
 * @namespace Entities.Request.Model.Queries.useRequests
 */
export const useRequests = (params?: RequestsFilterData): RequestListQueryData => {
  const { data, isLoading, error } = useQuery({
    queryKey: queryKeys.list(params || {}),
    queryFn: () => fetchRequests(params)
  })

  return {
    requests: data || [],
    isLoading,
    error: error as RestError | null
  }
}

/**
 * Хук для "запроса к провайдеру" по ID
 * @namespace Entities.Request.Model.Queries.useRequestById
 */
export const useRequestById = (requestId: number | null): RequestDetailQueryData => {
  const { data, isLoading, error } = useQuery({
    queryKey: queryKeys.details(requestId || 0),
    queryFn: () => fetchRequestsByProviderId(requestId || 0),
    enabled: requestId !== null
  })

  return {
    request: data || null,
    isLoading,
    error: error as RestError | null
  }
}
