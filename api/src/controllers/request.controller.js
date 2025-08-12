/**
 * Контроллер для обработки запросов к AI
 * @namespace Request.Controller
 */

import { createControllerLogger } from "#utils/logger.js"
import * as userService from "#services/request.service.js"

// Создаем логгер для контроллера запросов
const logger = createControllerLogger("RequestController")

/**
 * Получает список всех запросов
 * @memberof Request.Controller
 * @param {Object} req - Объект запроса Express
 * @param {Object} res - Объект ответа Express
 * @param {Function} next
 * @returns {void}
 */
export const getRequests = async (req, res, next) => {
  try {
    logger.info("Получение списка всех запросов")

    const requests = await userService.getRequests()

    logger.info("Список запросов успешно получен", {
      count: requests.length
    })

    res.json(requests)
  } catch (err) {
    logger.error("Ошибка при получении списка запросов", {
      error: err.message
    })

    next(err)
  }
}

/**
 * Получает запроса по ID
 * @memberof Request.Controller
 * @param {Object} req - Объект запроса Express
 * @param {Object} res - Объект ответа Express
 * @param {Function} next
 * @returns {void}
 */
export const getRequest = async (req, res, next) => {
  const requestId = req.params.requestId

  try {
    logger.info("Получение запроса по ID", {
      requestId
    })

    const request = await userService.getRequestById(requestId)

    logger.info("Запрос успешно получен", {
      requestId
    })

    res.json(request)
  } catch (err) {
    logger.error("Ошибка при получении запроса", {
      error: err.message
    })

    next(err)
  }
}

/**
 * Создает новый запрос
 * @memberof Request.Controller
 * @param {Object} req - Объект запроса Express
 * @param {string} req.body.prompt - Промпт для AI
 * @param {Object} res - Объект ответа Express
 * @param {Function} next
 * @returns {void}
 */
export const createRequest = async (req, res, next) => {
  const bot = req.body.bot
  const prompt = req.body.prompt

  try {
    logger.info("Создание нового запроса к AI", {
      bot,
      prompt
    })

    const request = await userService.createRequest(bot, prompt)

    logger.info("Запрос к AI успешно создан", {
      requestId: request[0].id,
      bot,
      prompt
    })

    res.status(201).json(request)
  } catch (err) {
    logger.error("Ошибка при создании запроса к AI", {
      error: err.message,
      bot
    })

    next(err)
  }
}
