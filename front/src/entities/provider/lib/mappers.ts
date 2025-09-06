import type { Provider } from "../lib/types"
import type { ProviderRequestDTO, ProviderResponseDTO } from "../api/dto"

/**
 * Маппер из DTO в сущность
 * @namespace Entities.Provider.Lib.Mappers.toProviderSchema
 */
export const toProviderSchema = (dto: ProviderResponseDTO): Provider => ({
  id: dto.id,
  driver: dto.driver,
  name: dto.name,
  description: dto.description,
  config: dto.config
})

/**
 * Маппер из сущности в DTO
 * @namespace Entities.Provider.Lib.Mappers.toProviderDTO
 */
export const toProviderDTO = (provider: Partial<Provider>): Partial<ProviderRequestDTO> => {
  const data = {} as Partial<ProviderRequestDTO>

  if (provider.driver) data.driver = provider.driver
  if (provider.name) data.name = provider.name
  if (provider.description) data.description = provider.description
  if (provider.config) data.config = provider.config

  return data
}
