/**
 * Контроллер для обработки запросов к AI
 * @namespace Request.Controller
 */

import * as userService from "#services/request.service.js"

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
    const all = await userService.getRequests()

    res.json(all)
  } catch (err) {
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
  try {
    const request = await userService.getRequestById(req.params.requestId)

    res.json(request)
  } catch (err) {
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
  try {
    const prompt = req.body.prompt
    const [user] = await userService.createRequest({
      model: "test",
      prompt,
      content: "test",
      payload: { id: 1 },
      response: { id: 2 }
    })

    res.status(201).json(user)
  } catch (err) {
    next(err)
  }
}
