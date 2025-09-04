import { createHttpLogger } from "@utils/logger.js"

const logger = createHttpLogger()

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
  logger.info("Входящий HTTP запрос", {
    ip: req.get("x-real-ip") || req.ip,
    host: req.get("host") || req.hostname,
    scheme: req.get("x-forwarded-proto") || req.protocol,
    method: req.method,
    url: req.url,
    query: req.query,
    headers: req.headers
  })

  // Перехватываем ответ для логгирования
  const originalSend = res.send

  res.send = function (data) {
    const duration = Date.now() - startTime

    logger.info("Исходящий HTTP ответ", {
      statusCode: res.statusCode,
      duration: `${duration}ms`,
      params: req.params,
      responseSize: data ? data.length : 0
    })

    originalSend.call(this, data)
  }

  next()
}
