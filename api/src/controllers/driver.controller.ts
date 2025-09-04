/**
 * Контроллер для работы с драйверами
 * @namespace Driver.Controller
 */

import { Request, Response, NextFunction } from "express"
import { createControllerLogger } from "@utils/logger"
import * as driverService from "@services/dirver.service"

// Создаем логгер для контроллера драйверов
const logger = createControllerLogger("DriverController")

/**
 * Получить список всех драйверов
 * @namespace Driver.Controller.getDrivers
 */
export const getDrivers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    logger.info("Получение списка всех драйверов")

    const drivers = await driverService.getDrivers()

    logger.info("Список драйверов успешно получен", { count: drivers.length })

    res.json(drivers)
  } catch (err) {
    logger.error("Ошибка при получении списка драйверов", { error: err.message })

    next(err)
  }
}

/**
 * Получить драйвер по ID
 * @namespace Driver.Controller.getDriver
 */
export const getDriver = async (req: Request, res: Response, next: NextFunction) => {
  const driverId = parseInt(req.params.driverId)

  try {
    logger.info("Получение драйвера по ID", { driverId })

    const driver = await driverService.getDriverById(driverId)

    logger.info("Драйвер успешно получен", { driverId })

    res.json(driver)
  } catch (err) {
    logger.error("Ошибка при получении драйвера", { error: err.message, driverId })

    next(err)
  }
}
