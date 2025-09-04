import logger from "@utils/logger.js"
import { AppError } from "@utils/errors.js"

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
  // Определяем статус код и сообщение ошибки
  let statusCode = 500
  let message = "Внутренняя ошибка сервера"
  let code = "INTERNAL_ERROR"

  // Если это наша кастомная ошибка
  if (err instanceof AppError) {
    statusCode = err.statusCode
    message = err.message
    code = err.code
  } else {
    // Для стандартных ошибок Node.js
    if (err.name === "ValidationError") {
      statusCode = 400
      message = "Неверные данные запроса"
      code = "VALIDATION_ERROR"
    } else if (err.name === "CastError") {
      statusCode = 400
      message = "Неверный формат данных"
      code = "INVALID_FORMAT"
    } else if (err.code === "ENOENT") {
      statusCode = 404
      message = "Ресурс не найден"
      code = "NOT_FOUND"
    }
  }

  // Логируем ошибку
  logger.error("Ошибка приложения", {
    code,
    error: err.message,
    statusCode,
    method: req.method,
    url: req.url,
    ip: req.ip,
    userAgent: req.get("User-Agent"),
    requestInfo: err.requestInfo,
    stack: err.stack
  })

  // Отправляем ответ клиенту
  res.status(statusCode).json({
    error: {
      code,
      message,
      statusCode
    }
  })
}
