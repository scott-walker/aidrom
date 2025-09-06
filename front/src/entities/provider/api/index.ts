import { restClient } from "@shared/api"
import type { ProviderSchema } from "../lib/types"
import { toProviderDTO, toProviderSchema } from "../lib/mappers"

/**
 * Создать провайдера
 * @namespace Entities.Provider.Api.createProvider
 */
export const createProvider = async (provider: Partial<ProviderSchema>) => {
  const { data } = await restClient.post("providers", toProviderDTO(provider))

  return toProviderSchema(data)
}

/**
 * Обновить провайдера
 * @namespace Entities.Provider.Api.updateProvider
 */
export const updateProvider = async (provider: Partial<ProviderSchema>) => {
  const { data } = await restClient.put(`providers/${provider.id}`, toProviderDTO(provider))

  return toProviderSchema(data)
}

/**
 * Получить список провайдеров
 * @namespace Entities.Provider.Api.fetchProviders
 */
export const fetchProviders = async (): Promise<ProviderSchema[]> => {
  const { data } = await restClient.get("providers")

  return data.map(toProviderSchema)
}
