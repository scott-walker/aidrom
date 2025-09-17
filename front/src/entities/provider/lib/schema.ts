/**
 * Схема провайдера
 * @namespace Entities.Provider.Lib.Schema.Provider
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
 * Интерфейс конфигурации параметров запроса к драйверу (общий)
 * @namespace Entities.Provider.Lib.Schema.DriverParamsConfigParameter
 */
export interface DriverParamsConfigParameter {
  name: string
  label: string
  type: string
}

/**
 * Интерфейс конфигурации параметров запроса к драйверу (строка)
 * @namespace Entities.Provider.Lib.Schema.DriverParamsConfigParameterSelect
 */
export interface DriverParamsConfigParameterSelect extends DriverParamsConfigParameter {
  type: "select"
  options: string[]
}

/**
 * Интерфейс конфигурации параметров запроса к драйверу (число)
 * @namespace Entities.Provider.Lib.Schema.DriverParamsConfigParameterRange
 */
export interface DriverParamsConfigParameterRange extends DriverParamsConfigParameter {
  type: "range"
  step: number
  min: number
  max: number
}

/**
 * Интерфейс конфигурации параметров запроса к драйверу
 * @namespace Entities.Provider.Lib.Schema.DriverParamsConfig
 */
export interface DriverParamsConfig {
  meta: Record<string, unknown>
  params: (DriverParamsConfigParameterSelect | DriverParamsConfigParameterRange)[]
}
