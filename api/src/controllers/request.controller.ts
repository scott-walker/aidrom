/**
 * Контроллер для работы с запросами
 * @namespace Request.Controller
 */

import { Request, Response, NextFunction } from "express"
import { createControllerLogger } from "@utils/logger"
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
 * Очистка битых запросов
 * @namespace Request.Controller.cleanBrokenRequests
 */
export const cleanBrokenRequests = async (req: Request, res: Response, next: NextFunction) => {
  try { 
    logger.info("Очистка битых запросов")

    await requestService.cleanBrokenRequests()

    logger.info("Битые запросы успешно очищены")

    res.json({ message: "Битые запросы успешно очищены" })
  } catch (err) {
    logger.error("Ошибка при очистке битых запросов", { error: err.message })

    next(err)
  }
}
