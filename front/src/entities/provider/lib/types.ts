/**
 * Схема провайдера
 * @namespace Entities.Provider.Lib.Types.Provider
 */
export interface Provider {
  id: number
  driver: string
  name: string
  description: string
  config: string
}

/**
 * Схема провайдера с конфигурацией параметров драйвера
 * @namespace Entities.Provider.Lib.Types.ProviderWithDriverParamsConfig
 */
export interface ProviderWithDriverParamsConfig extends Provider {
  driverParamsConfig: DriverRequestParamsConfig
}

/**
 * Схема конфигурации параметров драйвера
 * @namespace Entities.Provider.Lib.Types.DriverRequestParamsConfig
 */
export interface DriverRequestParamsConfig {
  model: string[]
  maxTokens: { min: number; max: number }
  topP: { min: number; max: number }
  temperature: { min: number; max: number }
  frequencyPenalty: { min: number; max: number }
  presencePenalty: { min: number; max: number }
}

/**
 * Тип для данных запроса списка провайдеров
 * @namespace Entities.Provider.Lib.Types.ProvidersQueryData
 */
export type ProvidersQueryData = {
  providers: Provider[]
  isLoading: boolean
  error: Error | null
}

/**
 * Тип для данных запроса одного провайдера
 * @namespace Entities.Provider.Lib.Types.ProviderQueryData
 */
export type ProviderQueryData = {
  provider: ProviderWithDriverParamsConfig | undefined | null
  isLoading: boolean
  error: Error | null
}

/**
 * Тип для данных запроса создания провайдера
 * @namespace Entities.Provider.Lib.Types.ProviderCreateData
 */
export type ProviderCreateData = {
  driver: string
  name: string
  description: string
  config: string
}

/**
 * Тип для данных запроса обновления провайдера
 * @namespace Entities.Provider.Lib.Types.ProviderUpdateData
 */
export type ProviderUpdateData = Partial<ProviderCreateData>
