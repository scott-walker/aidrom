/**
 * Сервис для работы с драйверами
 * @namespace Driver.Service
 */

import { eq, desc, InferInsertModel, InferSelectModel } from "drizzle-orm"
import { db, drivers } from "@db"
import { createServiceLogger } from "@utils/logger"
import { NotFoundError } from "@utils/errors"

// Типы для драйвера
type Driver = InferSelectModel<typeof drivers>
type CreateDriverData = InferInsertModel<typeof drivers>
type UpdateDriverData = Partial<CreateDriverData>

// Создаем логгер для сервиса драйверов
const logger = createServiceLogger("DriverService")

/**
 * Получить всех драйверов из базы данных
 * @memberof Driver.Service
 * @returns {Promise<Array<Object>>} Массив объектов с информацией о драйверах.
 */
export const getDrivers = async (): Promise<Driver[]> => {
  try {
    logger.info("Получение всех драйверов из БД")

    const items = await db.query.drivers.findMany({
      orderBy: [desc(drivers.id)]
    })

    logger.info("Запрос к БД выполнен успешно", {
      count: items.length
    })

    return items
  } catch (error) {
    logger.error("Ошибка при получении всех драйверов из БД", {
      error: error.message
    })

    throw error
  }
}

/**
 * Получить драйвер по его идентификатору
 * @memberof Driver.Service
 * @param {string|number} driverId - Идентификатор драйвера.
 * @returns {Promise<Object>} Объект с информацией о драйвере.
 */
export const getDriverById = async (driverId: number): Promise<Driver> => {
  try {
    logger.info("Получение драйвера по ID", {
      driverId
    })

    const driverItem = await db.query.drivers.findFirst({
      where: eq(drivers.id, driverId)
    })

    if (!driverItem) {
      throw new NotFoundError(`Драйвер с ID #${driverId} не найден`)
    }

    logger.info("Драйвер по ID успешно найден", {
      driverId
    })

    return driverItem
  } catch (error) {
    logger.error("Ошибка при получении драйвера по ID", {
      error: error.message,
      driverId
    })

    throw error
  }
}

/**
 * Получить драйвер по алиасу
 * @memberof Driver.Service
 * @param {string} alias - Алиас драйвера.
 * @returns {Promise<Object>} Объект с информацией о драйвере.
 */
export const getDriverByAlias = async (alias: string): Promise<Driver> => {
  try {
    logger.info("Получение драйвера по алиасу", {
      alias
    })

    const driverItem = await db.query.drivers.findFirst({
      where: eq(drivers.alias, alias)
    })

    if (!driverItem) {
      throw new NotFoundError(`Драйвер с алиасом ${alias} не найден`)
    }

    logger.info("Драйвер по алиасу успешно найден", {
      alias
    })

    return driverItem
  } catch (error) {
    logger.error("Ошибка при получении драйвера по алиасу", {
      error: error.message,
      alias
    })

    throw error
  }
}

/**
 * Создать нового драйвера
 * @memberof Driver.Service
 * @param {Object} data - Данные для создания драйвера
 * @param {string} data.alias - Алиас драйвера
 * @param {Object} data.config - Конфигурация драйвера
 * @param {string} [data.description] - Описание драйвера
 */
export const createDriver = async (data: CreateDriverData): Promise<Driver> => {
  try {
    logger.info("Создание нового драйвера в БД", data)

    const [driverItem] = await db.insert(drivers).values(data).returning()

    logger.info("Драйвер успешно создан", {
      driverId: driverItem.id
    })

    return driverItem
  } catch (error) {
    logger.error("Ошибка при создании драйвера", {
      error: error.message,
      data
    })

    throw error
  }
}

/**
 * Обновить данные драйвера
 * @memberof Driver.Service
 * @param {string|number} driverId - Идентификатор драйвера
 * @param {Object} data - Данные для обновления
 * @param {string} [data.alias] - Алиас драйвера
 * @param {Object} [data.config] - Конфигурация драйвера
 * @param {string} [data.description] - Описание драйвера
 * @returns {Promise<Object>} Обновленный драйвер
 */
export const updateDriver = async (driverId: number, data: UpdateDriverData): Promise<Driver> => {
  try {
    logger.info("Обновление драйвера в БД", {
      driverId,
      data
    })

    const [driverItem] = await db.update(drivers).set(data).where(eq(drivers.id, driverId)).returning()

    if (!driverItem) {
      throw new NotFoundError(`Драйвер с ID #${driverId} не найден`)
    }

    logger.info("Драйвер успешно обновлен", {
      driverId
    })

    return driverItem
  } catch (error) {
    logger.error("Ошибка при обновлении драйвера", {
      error: error.message,
      driverId,
      data
    })

    throw error
  }
}

/**
 * Удалить драйвер
 * @memberof Driver.Service
 * @param {string|number} driverId - Идентификатор драйвера
 * @returns {Promise<Object>} Удаленный драйвер
 */
export const deleteDriver = async (driverId: number): Promise<Driver> => {
  try {
    logger.info("Удаление драйвера из БД", {
      driverId
    })

    const [driverItem] = await db.delete(drivers).where(eq(drivers.id, driverId)).returning()

    if (!driverItem) {
      throw new NotFoundError(`Драйвер с ID #${driverId} не найден`)
    }

    logger.info("Драйвер успешно удален", {
      driverId
    })

    return driverItem
  } catch (error) {
    logger.error("Ошибка при удалении драйвера", {
      error: error.message,
      driverId
    })

    throw error
  }
}
