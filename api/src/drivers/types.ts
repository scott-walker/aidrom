/**
 * Интерфейсы драйверов
 * @namespace Drivers
 */

import { ISender } from "@utils/sender"

/**
 * Статус работы драйвера
 * @namespace Drivers.DriverStatus
 */
export enum DriverStatus {
  OK = "ok",
  ERROR = "error"
}

/**
 * Роли контекста запроса к драйверу
 * @namespace Drivers.DriverRequestMessageRole
 */
export enum DriverRequestMessageRole {
  SYSTEM = "system",
  USER = "user",
  ASSISTANT = "assistant",
  TOOL = "tool"
}

/**
 * Интерфейс контекста запроса к драйверу
 * @namespace Drivers.DriverRequestMessage
 */
export interface DriverRequestMessage {
  role: DriverRequestMessageRole
  content: string
}

/**
 * Интерфейс контекста запроса к драйверу
 * @namespace Drivers.DriverRequestMessages
 */
export type DriverRequestMessages = DriverRequestMessage[]

/**
 * Интерфейс запроса к драйверу
 * @namespace Drivers.DriverRequest
 */
export interface DriverRequest {
  messages: DriverRequestMessages
  [key: string]: any
}

/**
 * Интерфейс конфигурации параметров запроса к драйверу (общий)
 * @namespace Drivers.DriverParamsConfigParameter
 */
export interface DriverParamsConfigParameter {
  name: string
  label: string
  type: string
}

/**
 * Интерфейс конфигурации параметров запроса к драйверу (строка)
 * @namespace Drivers.DriverParamsConfigParameterSelect
 */
export interface DriverParamsConfigParameterSelect extends DriverParamsConfigParameter {
  type: "select"
  options: string[]
}

/**
 * Интерфейс конфигурации параметров запроса к драйверу (число)
 * @namespace Drivers.DriverParamsConfigParameterRange
 */
export interface DriverParamsConfigParameterRange extends DriverParamsConfigParameter {
  type: "range"
  step: number
  min: number
  max: number
}

/**
 * Интерфейс конфигурации параметров запроса к драйверу (переключатель)
 * @namespace Drivers.DriverParamsConfigParameterToggle
 */
export interface DriverParamsConfigParameterToggle extends DriverParamsConfigParameter {
  type: "toggle"
}

/**
 * Интерфейс конфигурации параметров запроса к драйверу
 * @namespace Drivers.DriverParamsConfig
 */
export interface DriverParamsConfig {
  meta: Record<string, unknown>
  params: (DriverParamsConfigParameterSelect | DriverParamsConfigParameterRange | DriverParamsConfigParameterToggle)[]
}

/**
 * Интерфейс ответа от драйвера
 * @namespace Drivers.DriverResponse
 */
export interface DriverResponse {
  providerRequestId: string
  requestParams: {
    [key: string]: any
  }
  responseData: {
    [key: string]: any
  }
  requestTokens: number
  responseTokens: number
  content: string
}

/**
 * Интерфейс конфига драйвера
 * @namespace Drivers.DriverConfig
 */
export interface DriverConfig {}

/**
 * Интерфейс информации о драйвере
 * @namespace Drivers.DriverInfo
 */
export interface DriverInfo {
  [key: string]: unknown
}

/**
 * Интерфейс драйвера
 * @namespace Drivers.Driver
 */
export interface Driver {
  getInfo: () => Promise<DriverInfo>
  getParamsConfig: () => Promise<DriverParamsConfig>
  sendRequest: (request: DriverRequest) => ISender
}

/**
 * Интерфейс фабрики драйвера
 * @namespace Drivers.DriverFactory
 */
export interface DriverFactory {
  (config: DriverConfig): Driver
}

/**
 * Интерфейс коллекции фабрик драйверов
 * @namespace Drivers.DriverFactoriesCollection
 */
export interface DriverFactoriesCollection {
  [key: string]: DriverFactory
}
