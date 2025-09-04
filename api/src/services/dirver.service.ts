/**
 * Сервис для работы с драйверами
 * @namespace Driver.Service
 */

import { eq, desc } from "drizzle-orm"
import { db, drivers, Driver, CreateDriverData, UpdateDriverData } from "@db"
import { createServiceLogger } from "@utils/logger"
import { NotFoundError } from "@utils/errors"

// Создаем логгер для сервиса драйверов
const logger = createServiceLogger("DriverService")

/**
 * Получить всех драйверов из базы данных
 * @namespace Driver.Service.getDrivers
 */
export const getDrivers = async (): Promise<Driver[]> => {
  try {
    logger.info("Получение всех драйверов из БД")

    const items = await db.query.drivers.findMany({
      orderBy: [desc(drivers.id)]
    })

    logger.info("Запрос к БД выполнен успешно", { count: items.length })

    return items
  } catch (error) {
    logger.error("Ошибка при получении всех драйверов из БД", { error: error.message })

    throw error
  }
}

/**
 * Получить драйвер по его идентификатору
 * @namespace Driver.Service.getDriverById
 */
export const getDriverById = async (driverId: number): Promise<Driver> => {
  try {
    logger.info("Получение драйвера по ID", { driverId })

    const driverItem = await db.query.drivers.findFirst({
      where: eq(drivers.id, driverId)
    })

    if (!driverItem) {
      throw new NotFoundError(`Драйвер с ID #${driverId} не найден`)
    }

    logger.info("Драйвер по ID успешно найден", { driverId })

    return driverItem
  } catch (error) {
    logger.error("Ошибка при получении драйвера по ID", { error: error.message, driverId })

    throw error
  }
}

/**
 * Создать нового драйвера
 * @namespace Driver.Service.createDriver
 */
export const createDriver = async (data: CreateDriverData): Promise<Driver> => {
  try {
    logger.info("Создание нового драйвера в БД", data)

    const [driverItem] = await db.insert(drivers).values(data).returning()

    logger.info("Драйвер успешно создан", { driverId: driverItem.id })

    return driverItem
  } catch (error) {
    logger.error("Ошибка при создании драйвера", { error: error.message, data })

    throw error
  }
}

/**
 * Обновить данные драйвера
 * @namespace Driver.Service.updateDriver
 */
export const updateDriver = async (driverId: number, data: UpdateDriverData): Promise<Driver> => {
  try {
    logger.info("Обновление драйвера в БД", { driverId, data })

    const [driverItem] = await db.update(drivers).set(data).where(eq(drivers.id, driverId)).returning()

    if (!driverItem) {
      throw new NotFoundError(`Драйвер с ID #${driverId} не найден`)
    }

    logger.info("Драйвер успешно обновлен", { driverId })

    return driverItem
  } catch (error) {
    logger.error("Ошибка при обновлении драйвера", { error: error.message, driverId, data })

    throw error
  }
}

/**
 * Удалить драйвер
 * @namespace Driver.Service.deleteDriver
 */
export const deleteDriver = async (driverId: number): Promise<Driver> => {
  try {
    logger.info("Удаление драйвера из БД", { driverId })

    const [driverItem] = await db.delete(drivers).where(eq(drivers.id, driverId)).returning()

    if (!driverItem) {
      throw new NotFoundError(`Драйвер с ID #${driverId} не найден`)
    }

    logger.info("Драйвер успешно удален", { driverId })

    return driverItem
  } catch (error) {
    logger.error("Ошибка при удалении драйвера", { error: error.message, driverId })

    throw error
  }
}
