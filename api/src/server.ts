import app from "./app"
import { getConfigParam } from "@config"
import logger from "@utils/logger.js"

const HOST = getConfigParam("host")
const PORT = getConfigParam("port")

// Запуск сервера
const server = app.listen(PORT, () => {
  logger.info("Сервер запущен", { url: `http://${HOST}:${PORT}` })
})

/**
 * Обработчик graceful shutdown сервера
 * Логирует получение сигнала завершения и корректно останавливает сервер
 * @param {string} signal - Тип полученного сигнала
 */
const handleShutdown = (signal: string) => {
  logger.info(`Получен сигнал ${signal}, завершение работы сервера`)
  server.close(() => {
    logger.info("Сервер успешно остановлен")
    process.exit(0)
  })
}

// Обработка завершения работы сервера
process.on("SIGTERM", () => handleShutdown("SIGTERM"))
process.on("SIGINT", () => handleShutdown("SIGINT"))
