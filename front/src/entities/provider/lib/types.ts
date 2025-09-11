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
  provider: Provider | undefined | null
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
