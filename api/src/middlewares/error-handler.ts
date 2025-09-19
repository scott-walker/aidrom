import logger from "@utils/logger.js"
import { AppError } from "@utils/errors.js"
import { Request, Response, NextFunction } from "express"

/**
 * Middleware для обработки ошибок приложения
 * @namespace Middlewares.ErrorHandler
 */
export default (err: Error, req: Request, res: Response, next: NextFunction) => {
  let statusCode = 500
  let message = "Внутренняя ошибка сервера"
  let code = "INTERNAL_ERROR"

  if (err instanceof AppError) {
    statusCode = err.statusCode
    message = err.message
    code = err.code
  } else if (err.name === "ValidationError") {
    statusCode = 400
    message = "Неверные данные запроса"
    code = "VALIDATION_ERROR"
  } else if (err.name === "CastError") {
    statusCode = 400
    message = "Неверный формат данных"
    code = "INVALID_FORMAT"
  } else if ("code" in err && err.code === "ENOENT") {
    statusCode = 404
    message = "Ресурс не найден"
    code = "NOT_FOUND"
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
    requestInfo: "requestInfo" in err ? err.requestInfo : null,
    stack: err.stack
  })

  // Отправляем ответ клиенту
  res.status(statusCode).json({
    code,
    message,
    statusCode
  })
}
