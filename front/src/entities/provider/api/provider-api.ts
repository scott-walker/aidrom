import { restClient } from "@shared/api"
import type { Provider, ProviderCreateData, ProviderUpdateData } from "../lib/types"
import { toProviderCreateDTO, toProviderSchema, toProviderUpdateDTO } from "../lib/mappers"

/**
 * Создать провайдера
 * @namespace Entities.Provider.Api.createProvider
 */
export const createProvider = async (provider: ProviderCreateData): Promise<Provider> => {
  const { data } = await restClient.post("providers", toProviderCreateDTO(provider))

  return toProviderSchema(data)
}

/**
 * Обновить провайдера
 * @namespace Entities.Provider.Api.updateProvider
 */
export const updateProvider = async (providerId: number, provider: ProviderUpdateData): Promise<Provider> => {
  const { data } = await restClient.put(`providers/${providerId}`, toProviderUpdateDTO(provider))

  return toProviderSchema(data)
}

/**
 * Получить список провайдеров
 * @namespace Entities.Provider.Api.fetchProviders
 */
export const fetchProviders = async (): Promise<Provider[]> => {
  const { data } = await restClient.get("providers")

  return data.map(toProviderSchema)
}

/**
 * Получить провайдера по ID
 * @namespace Entities.Provider.Api.fetchProviderById
 */
export const fetchProviderById = async (providerId: number): Promise<Provider> => {
  const { data } = await restClient.get(`providers/${providerId}`)

  return toProviderSchema(data)
}
