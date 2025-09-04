import { NotFoundError } from "@utils/errors"
import { dummyDriver } from "./dummy"

const drivers = {
  dummy: dummyDriver
}

// type Driver = {
//   alias: string
//   name: string
//   description: string
//   params: Record<string, any>
// }

/**
 * Получить драйвер
 * @param {string} key - Ключ драйвера.
 */
export const getDriver = (key: string) => {
  const driver = drivers[key]

  if (!driver) {
    throw new NotFoundError(`Драйвер "${key}" не найден`)
  }

  return driver
}
