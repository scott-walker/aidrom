import type { DriverInfo, DriverParamsConfig } from "./schema"

/**
 * DTO провайдера
 * @namespace Entities.Provider.Model.ProviderDTO
 */
export interface ProviderDTO {
  id: number
  driver: string
  driverInfo: DriverInfo
  driverParamsConfig: DriverParamsConfig
  driverStatus: string
  name: string
  description: string
  config: Record<string, unknown>
  createdAt: string
  updatedAt: string
}

/**
 * DTO элемента списка провайдеров
 * @namespace Entities.Provider.Model.ProviderListItemDTO
 */
export interface ProviderListItemDTO {
  id: number
  driver: string
  name: string
  description: string
  config: Record<string, unknown>
  createdAt: string
  updatedAt: string
}

/**
 * DTO создания провайдера
 * @namespace Entities.Provider.Model.ProviderCreateDTO
 */
export interface ProviderCreateDTO {
  driver: string
  name: string
  description: string
  config: Record<string, unknown>
}

/**
 * DTO обновления провайдера
 * @namespace Entities.Provider.Model.ProviderUpdateDTO
 */
export interface ProviderUpdateDTO {
  driver?: string
  name?: string
  description?: string
  config?: Record<string, unknown>
}
