import app from "./app.js"
import config from "#config/index.js"
import logger from "#utils/logger.js"

const HOST = config("host")
const PORT = config("port")

// Запуск сервера
const server = app.listen(PORT, () => {
  logger.info("Сервер запущен", { url: `http://${HOST}:${PORT}` })
})

/**
 * Обработчик graceful shutdown сервера
 * Логирует получение сигнала завершения и корректно останавливает сервер
 * @param {string} signal - Тип полученного сигнала
 * @returns {void}
 */
const handleShutdown = signal => {
  logger.info(`Получен сигнал ${signal}, завершение работы сервера`)
  server.close(() => {
    logger.info("Сервер успешно остановлен")
    process.exit(0)
  })
}

// Обработка завершения работы сервера
process.on("SIGTERM", () => handleShutdown("SIGTERM"))
process.on("SIGINT", () => handleShutdown("SIGINT"))
