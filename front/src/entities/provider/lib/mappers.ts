import type { Provider, ProviderCreateData } from "./types"
import type { ProviderRequestDTO, ProviderResponseDTO } from "./dto"

/**
 * Маппер из DTO в сущность
 * @namespace Entities.Provider.Lib.Mappers.toProviderSchema
 */
export const toProviderSchema = (dto: ProviderResponseDTO): Provider => ({
  id: dto.id,
  driver: dto.driver,
  name: dto.name,
  description: dto.description,
  config: JSON.stringify(dto.config)
})

/**
 * Маппер из сущности в DTO создания провайдера
 * @namespace Entities.Provider.Lib.Mappers.toProviderCreateDTO
 */
export const toProviderCreateDTO = (provider: ProviderCreateData): ProviderRequestDTO => {
  return {
    driver: provider.driver,
    name: provider.name,
    description: provider.description,
    config: JSON.parse(provider.config)
  }
}

/**
 * Маппер из сущности в DTO обновления провайдера
 * @namespace Entities.Provider.Lib.Mappers.toProviderUpdateDTO
 */
export const toProviderUpdateDTO = (provider: Partial<Provider>): Partial<ProviderRequestDTO> => {
  const data = {} as Partial<ProviderRequestDTO>

  if (provider.driver) data.driver = provider.driver
  if (provider.name) data.name = provider.name
  if (provider.description) data.description = provider.description
  if (provider.config) data.config = JSON.parse(provider.config)

  return data
}
