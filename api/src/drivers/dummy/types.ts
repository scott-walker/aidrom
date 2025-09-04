/**
 * Интерфейсы драйвера "заглушка"
 * @namespace Drivers.Dummy
 */

import {
  Driver,
  DriverConfig,
  DriverRequest,
  DriverResponse,
  DriverAdaptedResponse,
  DriverSendRequestMethod
} from "../types"

/**
 * Интерфейс запроса к драйверу "заглушка"
 * @namespace Drivers.Dummy.DummyDriverRequest
 */
export interface DummyDriverRequest extends DriverRequest {}

/**
 * Интерфейс ответа от драйвера "заглушка"
 * @namespace Drivers.Dummy.DummyDriverResponse
 */
export interface DummyDriverResponse extends DriverResponse {}

/**
 * Интерфейс конфига драйвера "заглушка"
 * @namespace Drivers.Dummy.DummyDriverConfig
 */
export interface DummyDriverConfig extends DriverConfig {}

/**
 * Интерфейс метода отправки запроса к API драйвера "заглушка"
 * @namespace Drivers.Dummy.DummyDriverSendRequestMethod
 */
export interface DummyDriverSendRequestMethod extends DriverSendRequestMethod {
  (request: DummyDriverRequest): Promise<DriverAdaptedResponse>
}

/**
 * Интерфейс драйвера "заглушка"
 * @namespace Drivers.Dummy.DummyDriver
 */
export interface DummyDriver extends Driver {
  sendRequest: DummyDriverSendRequestMethod
}
