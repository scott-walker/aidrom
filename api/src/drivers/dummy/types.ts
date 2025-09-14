/**
 * Интерфейсы драйвера "заглушка"
 * @namespace Drivers.Dummy
 */

import { DriverConfig, DriverRequest, DriverResponse } from "../types"

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
