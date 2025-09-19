/**
 * Базовый класс для кастомных ошибок приложения
 * @namespace Utils.AppError
 */
export class AppError extends Error {
  statusCode: number
  code: string
  isOperational: boolean
  stack?: string

  constructor(message: string, statusCode = 500, code = "INTERNAL_ERROR") {
    super(message)
    this.name = this.constructor.name
    this.statusCode = statusCode
    this.code = code
    this.isOperational = true

    Error.captureStackTrace(this, this.constructor)
  }
}

/**
 * Ошибка для случаев, когда ресурс не найден
 * @namespace Utils.NotFoundError
 */
export class NotFoundError extends AppError {
  constructor(message = "Ресурс не найден", code = "NOT_FOUND") {
    super(message, 404, code)
  }
}

/**
 * Ошибка для случаев неверных данных запроса
 * @namespace Utils.ValidationError
 */
export class ValidationError extends AppError {
  constructor(message = "Неверные данные запроса", code = "VALIDATION_ERROR") {
    super(message, 400, code)
  }
}

/**
 * Ошибка для случаев неавторизованного доступа
 * @namespace Utils.UnauthorizedError
 */
export class UnauthorizedError extends AppError {
  constructor(message = "Неавторизованный доступ", code = "UNAUTHORIZED") {
    super(message, 401, code)
  }
}

/**
 * Ошибка для случаев запрещенного доступа
 * @namespace Utils.ForbiddenError
 */
export class ForbiddenError extends AppError {
  constructor(message = "Доступ запрещен", code = "FORBIDDEN") {
    super(message, 403, code)
  }
}

/**
 * Ошибка для случаев ошибок API
 * @namespace Utils.ApiError
 */
export class ApiError extends AppError {
  constructor(message = "Ошибка API", code = "API_ERROR") {
    super(message, 500, code)
  }
}

/**
 * Ошибка для случаев ошибок отправщика сообщений
 * @namespace Services.SenderError
 */
export class SenderError extends AppError {
  constructor(message = "Ошибка отправщика сообщений", stack: string = "", code = "SENDER_ERROR") {
    super(message, 500, code)

    this.stack = [this.stack, stack].join("\n\nSender handler stack:\n")
  }
}

/**
 * Ошибка для случаев ошибок SSE сессий
 * @namespace Utils.SSEError
 */
export class SseError extends AppError {
  constructor(message = "Ошибка SSE сессий", code = "SSE_ERROR") {
    super(message, 500, code)
  }
}

// /**
//  * Ошибка для случаев превышения лимитов
//  * @namespace Utils.RateLimitError
//  */
// export class RateLimitError extends AppError {
//   constructor(message = "Превышен лимит запросов", code = "RATE_LIMIT") {
//     super(message, 429, code)
//   }
// }
