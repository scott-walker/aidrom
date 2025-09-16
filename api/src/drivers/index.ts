import { ApiError } from "@utils/errors"
import { DriverFactoriesCollection, DriverConfig, Driver } from "./types"
import { createDummyDriver } from "./dummy"
import { createDeepseekDriver } from "./deepseek"
import { createGigachatDriver } from "./gigachat"

export * from "./types"

/**
 * Коллекция фабрик драйверов
 * @namespace Drivers.drivers
 */
const driverFactories: DriverFactoriesCollection = {
  dummy: createDummyDriver,
  deepseek: createDeepseekDriver,
  gigachat: createGigachatDriver
}

/**
 * Инициализировать драйвер
 * @namespace Drivers.initDriver
 * @param {string} alias - Алиас драйвера
 * @param {DriverConfig} config - Конфиг драйвера
 */
export const initDriver = (alias: string, config: DriverConfig): Driver => {
  const createDriver = driverFactories[alias]

  if (!createDriver) {
    throw new ApiError(`Драйвер "${alias}" не найден`)
  }

  return createDriver(config)
}
