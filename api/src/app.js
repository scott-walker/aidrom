import express from "express"
import cors from "cors"
import config from "#config/index.js"
import routes from "#routes/index.js"
import requestLogger from "#middlewares/requestLogger.js"
import errorHandler from "#middlewares/errorHandler.js"
import logger from "#utils/logger.js"

// Инициализация приложения
const app = express()

// Логгирование запросов
app.use(requestLogger)

// CORS
app.use(cors({ origin: config("corsOrigin") }))

// Парсинг JSON
app.use(express.json())

// Маршруты
app.use("/", routes)

// Обработка ошибок
app.use(errorHandler)

// Логгирование запуска приложения
logger.info("Приложение инициализировано", {
  corsOrigin: config("corsOrigin"),
  logLevel: config("logLevel")
})

export default app
