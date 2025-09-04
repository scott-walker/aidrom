import { NotFoundError } from "@utils/errors.js"

/**
 * Middleware для обработки несуществующих маршрутов
 * Должен быть размещен ПОСЛЕ всех маршрутов, но ПЕРЕД errorHandler
 * @param {Object} req - Объект запроса Express
 * @param {Object} res - Объект ответа Express
 * @param {Function} next - Функция передачи управления следующему middleware
 * @returns {void}
 */
export default (req, res, next) => {
  // Создаем ошибку 404 с информацией о запросе
  const error = new NotFoundError(`Маршрут ${req.method} ${req.originalUrl} не найден`)

  // Добавляем дополнительную информацию в ошибку
  // error.requestInfo = {
  //   method: req.method,
  //   url: req.originalUrl,
  //   baseUrl: req.baseUrl,
  //   path: req.path,
  //   ip: req.ip,
  //   userAgent: req.get("User-Agent")
  // }

  next(error)
}
