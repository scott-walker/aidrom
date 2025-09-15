/**
 * Схема провайдера
 * @namespace Entities.Provider.Lib.Types.Provider
 */
export interface Provider {
  id: number
  driver: string
  driverParamsConfig: DriverParamsConfig
  name: string
  description: string
  config: object
}

/**
 * Схема конфигурации параметров драйвера
 * @namespace Entities.Provider.Lib.Types.DriverParamsConfig
 */
export interface DriverParamsConfig {
  model: string[]
  maxTokens: { min: number; max: number }
  topP: { min: number; max: number }
  temperature: { min: number; max: number }
  frequencyPenalty: { min: number; max: number }
  presencePenalty: { min: number; max: number }
}
