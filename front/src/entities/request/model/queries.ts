import { useQuery } from "@tanstack/react-query"
import { type RequestsQueryData } from "../lib/types"
import { fetchRequests } from "../api"
import { queryKeys } from "../lib/keys"

// 5 минут кеша
const STALE_TIME = 300000

/**
 * Хук для запроса списка запросов к провайдерам
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

  return { requests, isLoading, error }
}
