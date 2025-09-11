import { useQuery } from "@tanstack/react-query"
import type { ProvidersQueryData, ProviderQueryData } from "../lib/types"
import { fetchProviderById, fetchProviders } from "./provider-api"

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
  all: ["providers"] as const,
  list: (filters: Record<string, string>) => [...queryKeys.all, "list", filters] as const,
  details: (id: number) => [...queryKeys.all, "details", id] as const
}

/**
 * Хук для запроса списка провайдеров
 * @namespace Entities.Provider.Api.useProviders
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

/**
 * Хук для запроса провайдера по ID
 * @namespace Entities.Provider.Api.useProviderById
 */
export const useProviderById = (providerId: number): ProviderQueryData => {
  const {
    data: provider,
    isLoading,
    error
  } = useQuery({
    queryKey: queryKeys.details(providerId),
    queryFn: () => fetchProviderById(providerId)
  })

  return { provider, isLoading, error }
}
