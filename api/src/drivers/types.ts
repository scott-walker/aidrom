/**
 * Интерфейсы драйверов
 * @namespace Drivers
 */

/**
 * Интерфейс запроса к драйверу
 * @namespace Drivers.DriverRequest
 */
export interface DriverRequest {
  [key: string]: any
}

/**
 * Интерфейс ответа от драйвера
 * @namespace Drivers.DriverResponse
 */
export interface DriverResponse {
  content: string
  data: {
    [key: string]: any
  }
}

/**
 * Интерфейс ответа от API (адаптированный под приложение)
 * @namespace Drivers.DriverAdaptedResponse
 */
export interface DriverAdaptedResponse {
  content: string
  data: {
    [key: string]: any
  }
}

/**
 * Интерфейс конфига драйвера
 * @namespace Drivers.DriverConfig
 */
export interface DriverConfig {
  alias: string
  baseUrl: string
  apiKey: string
}

/**
 * Интерфейс метода отправки запроса к API
 * @namespace Drivers.DriverSendRequestMethod
 */
export interface DriverSendRequestMethod {
  (request: DriverRequest): Promise<DriverAdaptedResponse>
}

/**
 * Интерфейс драйвера
 * @namespace Drivers.Driver
 */
export interface Driver {
  alias: string
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
 * Интерфейс коллекции драйверов
 * @namespace Drivers.DriversCollection
 */
export interface DriversCollection {
  [key: Driver["alias"]]: DriverFactory
}
