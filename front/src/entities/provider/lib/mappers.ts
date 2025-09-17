import type { Provider, ProviderListItem } from "./schema"
import type { ProviderDTO, ProviderListItemDTO, ProviderCreateDTO, ProviderUpdateDTO } from "./dto"
import type { ProviderCreateData, ProviderUpdateData } from "./types"

/**
 * Маппер из DTO в сущность
 * @namespace Entities.Provider.Lib.Mappers.toProvider
 */
export const toProvider = (dto: ProviderDTO): Provider => ({
  id: dto.id,
  driver: dto.driver,
  driverInfo: dto.driverInfo,
  driverParamsConfig: dto.driverParamsConfig,
  name: dto.name,
  description: dto.description,
  config: dto.config,
  createdAt: new Date(dto.createdAt),
  updatedAt: new Date(dto.updatedAt)
})

/**
 * Маппер из DTO в сущность элемента списка провайдеров
 * @namespace Entities.Provider.Lib.Mappers.toProviderListItem
 */
export const toProviderListItem = (dto: ProviderListItemDTO): ProviderListItem => ({
  id: dto.id,
  driver: dto.driver,
  name: dto.name,
  description: dto.description,
  config: dto.config,
  createdAt: new Date(dto.createdAt),
  updatedAt: new Date(dto.updatedAt)
})

/**
 * Маппер из данных запроса в DTO создания провайдера
 * @namespace Entities.Provider.Lib.Mappers.toProviderCreateDTO
 */
export const toProviderCreateDTO = (data: ProviderCreateData): ProviderCreateDTO => {
  return {
    driver: data.driver,
    name: data.name,
    description: data.description,
    config: data.config
  }
}

/**
 * Маппер из данных запроса в DTO обновления провайдера
 * @namespace Entities.Provider.Lib.Mappers.toProviderUpdateDTO
 */
export const toProviderUpdateDTO = (data: ProviderUpdateData): ProviderUpdateDTO => {
  const dto = {} as ProviderUpdateDTO

  if (data.driver !== undefined) dto.driver = data.driver
  if (data.name !== undefined) dto.name = data.name
  if (data.description !== undefined) dto.description = data.description
  if (data.config !== undefined) dto.config = data.config

  return dto
}
