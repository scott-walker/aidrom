/**
 * Базовый класс для кастомных ошибок приложения
 */
export class AppError extends Error {
  constructor(message, statusCode = 500, code = "INTERNAL_ERROR") {
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
 */
export class NotFoundError extends AppError {
  constructor(message = "Ресурс не найден", code = "NOT_FOUND") {
    super(message, 404, code)
  }
}

/**
 * Ошибка для случаев неверных данных запроса
 */
export class ValidationError extends AppError {
  constructor(message = "Неверные данные запроса", code = "VALIDATION_ERROR") {
    super(message, 400, code)
  }
}

/**
 * Ошибка для случаев неавторизованного доступа
 */
export class UnauthorizedError extends AppError {
  constructor(message = "Неавторизованный доступ", code = "UNAUTHORIZED") {
    super(message, 401, code)
  }
}

/**
 * Ошибка для случаев запрещенного доступа
 */
export class ForbiddenError extends AppError {
  constructor(message = "Доступ запрещен", code = "FORBIDDEN") {
    super(message, 403, code)
  }
}

/**
 * Ошибка для случаев ошибок API
 */
export class ApiError extends AppError {
  constructor(message = "Ошибка API", code = "API_ERROR") {
    super(message, 500, code)
  }
}

// /**
//  * Ошибка для случаев превышения лимитов
//  */
// export class RateLimitError extends AppError {
//   constructor(message = "Превышен лимит запросов", code = "RATE_LIMIT") {
//     super(message, 429, code)
//   }
// }
