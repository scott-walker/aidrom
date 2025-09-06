/**
 * Схема провайдера
 * @namespace Entities.Provider.Model.ProviderSchema
 */
export interface ProviderSchema {
  id: number
  driver: string
  name: string
  description: string
  config: {
    baseUrl: string
    apiKey: string
  }
}

/**
 * Тип для данных запроса списка провайдеров
 * @namespace Entities.Provider.Lib.ProvidersQueryData
 */
export type ProvidersQueryData = {
  providers: ProviderSchema[]
  isLoading: boolean
  error: Error | null
}
