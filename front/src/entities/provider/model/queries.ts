import { useQuery } from "@tanstack/react-query"
import { type ProvidersQueryData } from "../lib/types"
import { fetchProviders } from "../api"
import { queryKeys } from "../lib/keys"

// 1 минута кеша
const STALE_TIME = 60000

/**
 * Хук для запроса списка провайдеров
 * @namespace Entities.Provider.Model.Queries.useProviders
 */
export const useProviders = (): ProvidersQueryData => {
  const {
    data: providers = [],
    isLoading,
    error
  } = useQuery({
    queryKey: queryKeys.list({}),
    queryFn: fetchProviders,
    staleTime: STALE_TIME
  })

  return { providers, isLoading, error }
}
