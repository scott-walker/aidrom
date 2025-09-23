/**
 * Контроллер для работы с запросами
 * @namespace Request.Controller
 */

import { Request, Response, NextFunction } from "express"
import { createControllerLogger } from "@utils/logger"
import { BadRequestError } from "@utils/errors"
import * as requestService from "@services/request.service"

// Создаем логгер для контроллера запросов
const logger = createControllerLogger("RequestController")

/**
 * Получить список всех запросов
 * @namespace Request.Controller.getRequests
 */
export const getRequests = async (req: Request, res: Response, next: NextFunction) => {
  try {
    logger.info("Получение списка всех запросов")

    const requests = await requestService.getRequests(requestService.normalizeData(req.query))

    logger.info("Список запросов успешно получен", { count: requests.length })

    res.json(requests)
  } catch (err) {
    logger.error("Ошибка при получении списка запросов", { error: err.message })

    next(err)
  }
}

/**
 * Получить запрос по ID
 * @namespace Request.Controller.getRequest
 */
export const getRequest = async (req: Request, res: Response, next: NextFunction) => {
  const requestId = parseInt(req.params.requestId)

  try {
    logger.info("Получение запроса по ID", { requestId })

    const request = await requestService.getRequestById(requestId)

    logger.info("Запрос успешно получен", { requestId })

    res.json(request)
  } catch (err) {
    logger.error("Ошибка при получении запроса", { error: err.message, requestId })

    next(err)
  }
}

/**
 * Удаление запросов
 * @namespace Request.Controller.deleteRequests
 */
export const deleteRequests = async (req: Request, res: Response, next: NextFunction) => {
  try {
    logger.info("Удаление запросов")

    if (Object.keys(req.query).length === 0) {
      throw new BadRequestError("Не переданы параметры запроса")
    }

    const requests = await requestService.deleteRequests(requestService.normalizeData(req.query))

    logger.info("Запросы успешно удалены")

    res.json({ message: "Запросы успешно удалены", count: requests.length })
  } catch (err) {
    logger.error("Ошибка при удалении запросов", { error: err.message })

    next(err)
  }
}

/**
 * Очистка битых запросов
 * @namespace Request.Controller.clearBrokenRequests
 */
export const clearBrokenRequests = async (req: Request, res: Response, next: NextFunction) => {
  try {
    logger.info("Очистка битых запросов")

    const requests = await requestService.clearBrokenRequests()

    logger.info("Битые запросы успешно очищены")

    res.json({ message: "Битые запросы успешно очищены", count: requests.length })
  } catch (err) {
    logger.error("Ошибка при очистке битых запросов", { error: err.message })

    next(err)
  }
}
