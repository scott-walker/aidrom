import { httpLogger } from "#utils/logger.js"

/**
 * Middleware для логгирования HTTP запросов
 * Логирует информацию о входящих запросах и исходящих ответах
 * @param {Object} req - Объект запроса Express
 * @param {Object} res - Объект ответа Express
 * @param {Function} next - Функция передачи управления следующему middleware
 * @returns {void}
 */
export default (req, res, next) => {
  const startTime = Date.now()

  // Логируем входящий запрос
  httpLogger.info("Входящий HTTP запрос", {
    method: req.method,
    url: req.url,
    ip: req.ip,
    userAgent: req.get("User-Agent"),
    body: req.body,
    query: req.query,
    params: req.params
  })

  // Перехватываем ответ для логгирования
  const originalSend = res.send

  res.send = function (data) {
    const duration = Date.now() - startTime

    httpLogger.info("Исходящий HTTP ответ", {
      method: req.method,
      url: req.url,
      statusCode: res.statusCode,
      duration: `${duration}ms`,
      responseSize: data ? data.length : 0
    })

    originalSend.call(this, data)
  }

  next()
}
