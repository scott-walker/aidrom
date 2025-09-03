import type { ProviderSchema } from "../lib/types"
import type { ProviderRequestDTO, ProviderResponseDTO } from "../api/dto"

/**
 * Маппер из DTO в сущность
 * @namespace Entities.Provider.Model.toProviderSchema
 */
export const toProviderSchema = (dto: ProviderResponseDTO): ProviderSchema => ({
  id: dto.id,
  alias: dto.alias,
  name: dto.name,
  baseUrl: dto.baseUrl,
  apiKey: dto.apiKey
})

/**
 * Маппер из сущности в DTO
 * @namespace Entities.Provider.Model.toProviderDTO
 */
export const toProviderDTO = (provider: Partial<ProviderSchema>): Partial<ProviderRequestDTO> => {
  const data = {} as Partial<ProviderRequestDTO>

  if (provider.alias) data.alias = provider.alias
  if (provider.name) data.name = provider.name
  if (provider.baseUrl) data.baseUrl = provider.baseUrl
  if (provider.apiKey) data.apiKey = provider.apiKey

  return data
}
