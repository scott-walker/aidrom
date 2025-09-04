/**
 * Интерфейсы драйверов
 * @namespace Drivers
 */

/**
 * Интерфейс запроса к драйверу
 * @namespace Drivers.DriverRequest
 */
export interface DriverRequest {
  message: string
  params: {
    [key: string]: any
  }
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
  baseUrl: string
  apiKey: string
}

/**
 * Интерфейс метода отправки запроса к API
 * @namespace Drivers.DriverSendRequestMethod
 */
export interface DriverSendRequestMethod {
  (request: DriverRequest): Promise<DriverResponse>
}

/**
 * Интерфейс драйвера
 * @namespace Drivers.Driver
 */
export interface Driver {
  sendRequest: DriverSendRequestMethod
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
