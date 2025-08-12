import logger from "#utils/logger.js"

/**
 * Middleware для обработки ошибок приложения
 * Логирует ошибку и возвращает клиенту JSON с описанием ошибки
 * @param {Error} err - Объект ошибки
 * @param {Object} req - Объект запроса Express
 * @param {Object} res - Объект ответа Express
 * @param {Function} next - Функция передачи управления следующему middleware
 * @returns {void}
 */
export default (err, req, res, next) => {
  logger.error("Ошибка приложения", {
    error: err.message,
    stack: err.stack,
    method: req.method,
    url: req.url,
    ip: req.ip,
    userAgent: req.get("User-Agent")
  })

  res.status(500).json({ error: err.message || "Ошибка сервера" })
}
