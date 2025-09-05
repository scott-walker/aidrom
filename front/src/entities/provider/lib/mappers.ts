import type { ProviderSchema } from "../lib/types"
import type { ProviderRequestDTO, ProviderResponseDTO } from "../api/dto"

/**
 * Маппер из DTO в сущность
 * @namespace Entities.Provider.Model.toProviderSchema
 */
export const toProviderSchema = (dto: ProviderResponseDTO): ProviderSchema => ({
  id: dto.id,
  driver: dto.driver,
  name: dto.name,
  description: dto.description,
  config: dto.config
  // config: JSON.stringify(dto.config, null, 2)
})

/**
 * Маппер из сущности в DTO
 * @namespace Entities.Provider.Model.toProviderDTO
 */
export const toProviderDTO = (provider: Partial<ProviderSchema>): Partial<ProviderRequestDTO> => {
  const data = {} as Partial<ProviderRequestDTO>

  if (provider.driver) data.driver = provider.driver
  if (provider.name) data.name = provider.name
  if (provider.description) data.description = provider.description
  if (provider.config) data.config = provider.config

  return data
}
