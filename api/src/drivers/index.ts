import { NotFoundError } from "@utils/errors"
import { Driver, DriverFactory, DriversCollection } from "./types"
import { createDummyDriver } from "./dummy"
import { createDeepseekDriver } from "./deepseek"

/**
 * Коллекция драйверов
 * @namespace Drivers.drivers
 */
const drivers: DriversCollection = {
  dummy: createDummyDriver,
  deepseek: createDeepseekDriver
}

/**
 * Получить драйвер
 * @namespace Drivers.getDriver
 * @param {string} alias - Алиас драйвера
 */
export const getDriver = (alias: Driver["alias"]): DriverFactory => {
  const driver = drivers[alias]

  if (!driver) {
    throw new NotFoundError(`Драйвер "${alias}" не найден`)
  }

  return driver
}

// /**
//  * Инициализировать драйвер
//  * @namespace Drivers.initDriver
//  * @param {string} alias - Алиас драйвера
//  * @param {Driver["config"]} config - Конфиг драйвера
//  */
// export const initDriver = (alias: Driver["alias"], config: Driver["config"]): Driver => {
//   const driver = getDriver(alias)

//   return driver(config)
// }
