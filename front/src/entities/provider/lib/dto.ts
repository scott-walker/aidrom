/**
 * DTO провайдера
 * @namespace Entities.Provider.Model.ProviderDTO
 */
export interface ProviderDTO {
  id: number
  driver: string
  driverParamsConfig: {
    model: string[]
    maxTokens: { min: number; max: number }
    topP: { min: number; max: number }
    temperature: { min: number; max: number }
    frequencyPenalty: { min: number; max: number }
    presencePenalty: { min: number; max: number }
  }
  name: string
  description: string
  config: Record<string, unknown>
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
