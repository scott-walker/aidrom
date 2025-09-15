import { restClient } from "@shared/api"
import type { Provider } from "../lib/schema"
import type { ProviderCreateData, ProviderUpdateData } from "../lib/types"
import { toProviderCreateDTO, toProviderUpdateDTO, toProvider } from "../lib/mappers"

/**
 * Создать провайдера
 * @namespace Entities.Provider.Api.createProvider
 */
export const createProvider = async (data: ProviderCreateData): Promise<Provider> => {
  const { data: dto } = await restClient.post("providers", toProviderCreateDTO(data))

  return toProvider(dto)
}

/**
 * Обновить провайдера
 * @namespace Entities.Provider.Api.updateProvider
 */
export const updateProvider = async (providerId: number, data: ProviderUpdateData): Promise<Provider> => {
  const { data: dto } = await restClient.put(`providers/${providerId}`, toProviderUpdateDTO(data))

  return toProvider(dto)
}

/**
 * Получить список провайдеров
 * @namespace Entities.Provider.Api.fetchProviders
 */
export const fetchProviders = async (): Promise<Provider[]> => {
  const { data: dtos } = await restClient.get("providers")

  return dtos.map(toProvider)
}

/**
 * Получить провайдера по ID
 * @namespace Entities.Provider.Api.fetchProviderById
 */
export const fetchProviderById = async (providerId: number): Promise<Provider> => {
  const { data: dto } = await restClient.get(`providers/${providerId}`)

  return toProvider(dto)
}
