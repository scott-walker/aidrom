/**
 * Схема провайдера
 * @namespace Entities.Provider.Lib.Schema.Provider
 */
export interface Provider {
  id: number
  driver: string
  driverInfo: DriverInfo
  driverParamsConfig: DriverParamsConfig
  driverStatus: string
  name: string
  description: string
  config: Record<string, unknown>
  createdAt: Date
  updatedAt: Date
}

/**
 * Схема элемента списка провайдеров
 * @namespace Entities.Provider.Lib.Schema.ProviderListItem
 */
export interface ProviderListItem {
  id: number
  driver: string
  name: string
  description: string
  config: Record<string, unknown>
  createdAt: Date
  updatedAt: Date
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
 * Интерфейс конфигурации параметров запроса к драйверу (переключатель)
 * @namespace Entities.Provider.Lib.Schema.DriverParamsConfigParameterToggle
 */
export interface DriverParamsConfigParameterToggle extends DriverParamsConfigParameter {
  type: "toggle"
}

/**
 * Интерфейс конфигурации параметров запроса к драйверу
 * @namespace Entities.Provider.Lib.Schema.DriverParamsConfig
 */
export interface DriverParamsConfig {
  meta: Record<string, unknown>
  params: (DriverParamsConfigParameterSelect | DriverParamsConfigParameterRange | DriverParamsConfigParameterToggle)[]
}

/**
 * Интерфейс информации о драйвере
 * @namespace Entities.Provider.Lib.Schema.DriverInfo
 */
export interface DriverInfo {
  [key: string]: unknown
}
