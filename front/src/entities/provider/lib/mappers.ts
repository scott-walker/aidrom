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
  baseUrl: dto.base_url,
  apiKey: dto.api_key
})

/**
 * Маппер из сущности в DTO
 * @namespace Entities.Provider.Model.toProviderDTO
 */
export const toProviderDTO = (provider: Partial<ProviderSchema>): Partial<ProviderRequestDTO> => {
  const data = {} as Partial<ProviderRequestDTO>

  if (provider.alias) data.alias = provider.alias
  if (provider.name) data.name = provider.name
  if (provider.baseUrl) data.base_url = provider.baseUrl
  if (provider.apiKey) data.api_key = provider.apiKey

  return data
}
