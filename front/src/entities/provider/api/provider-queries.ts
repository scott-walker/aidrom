import { useQuery } from "@tanstack/react-query"
import type { RestError } from "@features/provider-form/model/api"
import type { ProviderListQueryData, ProviderDetailQueryData } from "../lib/types"
import { fetchProviderById, fetchProviders } from "./provider-api"

/**
 * Ключ запроса для провайдеров
 * @namespace Entities.Provider.Api.PROVIDER_QUERY_KEY
 */
export const PROVIDER_QUERY_KEY = "provider"

/**
 * Время кеширования в миллисекундах
 * @namespace Entities.Provider.Api.STALE_TIME
 */
const STALE_TIME = 60000

/**
 * Ключи запросов для провайдеров
 * @namespace Entities.Provider.Api.queryKeys
 */
export const queryKeys = {
  all: [PROVIDER_QUERY_KEY] as const,
  list: (filters: Record<string, string>) => [...queryKeys.all, "list", filters] as const,
  details: (id: number) => [...queryKeys.all, "details", id] as const
}

/**
 * Хук для запроса списка провайдеров
 * @namespace Entities.Provider.Api.useProviders
 */
export const useProviders = (): ProviderListQueryData => {
  const { data, isLoading, error } = useQuery({
    queryKey: queryKeys.list({}),
    queryFn: fetchProviders,
    staleTime: STALE_TIME
  })

  return {
    providers: data || [],
    isLoading,
    error: error as RestError | null
  }
}

/**
 * Хук для запроса провайдера по ID
 * @namespace Entities.Provider.Api.useProviderById
 */
export const useProviderById = (providerId: number): ProviderDetailQueryData => {
  const { data, isLoading, error } = useQuery({
    queryKey: queryKeys.details(providerId),
    queryFn: () => fetchProviderById(providerId)
  })

  return {
    provider: data || null,
    isLoading,
    error: error as RestError | null
  }
}
