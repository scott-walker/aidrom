import { ApiError } from "@utils/errors"
import { DriverFactoriesCollection, DriverConfig, Driver } from "./types"
import { createDummyDriver } from "./dummy"
import { createDeepseekDriver } from "./deepseek"
import { createGigachatDriver } from "./gigachat"

export * from "./types"
export { createSender, Sender } from "../utils/sender"

/**
 * Коллекция фабрик драйверов
 * @namespace Drivers.drivers
 */
export const driverFactories: DriverFactoriesCollection = {
  dummy: createDummyDriver,
  deepseek: createDeepseekDriver,
  gigachat: createGigachatDriver
}

/**
 * Инициализировать драйвер
 * @namespace Drivers.initDriver
 * @param {string} driver - Драйвер
 * @param {DriverConfig} config - Конфиг драйвера
 */
export const initDriver = (driver: string, config: DriverConfig): Driver => {
  const createDriver = driverFactories[driver]

  if (!createDriver) {
    throw new ApiError(`Драйвер "${driver}" не найден`)
  }

  return createDriver(config)
}
