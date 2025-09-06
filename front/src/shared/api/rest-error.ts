/**
 * Ошибка API
 * @namespace Shared.Api.RestError
 * @extends Error
 */
export class RestError extends Error {
  /**
   * Статус код
   */
  status: number

  /**
   * Конструктор ошибки RestError
   * @param message - Сообщение ошибки
   * @param status - Статус код
   */
  constructor(message = "Не удалось выполнить запрос", status = 500) {
    super(`Ошибка API (${status}): ${message}`)
    this.name = this.constructor.name
    this.status = status
  }

  /**
   * Обернуть ошибку в RestError
   * @param error - Ошибка
   * @param status - Статус код
   * @returns Ошибка RestError
   */
  static wrap(error: Error, status = 500) {
    return new RestError(error.message, status)
  }
}
