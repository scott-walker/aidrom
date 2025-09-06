/**
 * Схема провайдера
 * @namespace Entities.Provider.Lib.Types.Provider
 */
export interface Provider {
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
 * @namespace Entities.Provider.Lib.Types.ProvidersQueryData
 */
export type ProvidersQueryData = {
  providers: Provider[]
  isLoading: boolean
  error: Error | null
}
