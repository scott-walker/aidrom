/**
 * Интерфейсы драйверов
 * @namespace Drivers
 */

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
  params: DriverRequestParams
}

/**
 * Интерфейс параметров запроса к драйверу
 * @namespace Drivers.DriverRequestParams
 */
export interface DriverRequestParams {
  model: string
  maxTokens: number
  topP: number
  temperature: number
  frequencyPenalty: number
  presencePenalty: number
}

/**
 * Интерфейс конфигурации параметров запроса к драйверу
 * (позволяет получить диапазон значений для параметров)
 * @namespace Drivers.DriverRequestParamsConfig
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
export interface DriverConfig {
  // baseUrl: string
  // apiKey: string
}

/**
 * Интерфейс драйвера
 * @namespace Drivers.Driver
 */
export interface Driver {
  getParamsConfig: () => Promise<DriverRequestParamsConfig>
  sendRequest: (request: DriverRequest) => Promise<DriverResponse>
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
