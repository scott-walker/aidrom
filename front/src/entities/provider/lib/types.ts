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
