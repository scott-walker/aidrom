import { useQuery } from "@tanstack/react-query"
import type { RestError } from "@shared/api"
import type { ProviderListQueryData, ProviderDetailQueryData, ProviderDriversListQueryData } from "../lib/types"
import { fetchDrivers, fetchProviderById, fetchProviders } from "./provider-api"

/**
 * Ключ запроса для провайдеров
 * @namespace Entities.Provider.Api.PROVIDER_QUERY_KEY
 */
export const PROVIDER_QUERY_KEY = "provider"

/**
 * Ключ запроса для драйверов
 * @namespace Entities.Provider.Api.PROVIDER_DRIVERS_QUERY_KEY
 */
export const PROVIDER_DRIVERS_QUERY_KEY = "drivers"

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
  drivers: [PROVIDER_DRIVERS_QUERY_KEY] as const,
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
 * Хук для запроса списка драйверов
 * @namespace Entities.Provider.Api.useDrivers
 */
export const useDrivers = (): ProviderDriversListQueryData => {
  const { data, isLoading, error } = useQuery({
    queryKey: queryKeys.drivers,
    queryFn: fetchDrivers,
    staleTime: STALE_TIME
  })

  return {
    drivers: data || [],
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
