import express from "express"
import cors from "cors"
import config from "#config/index.js"
import routes from "#routes/index.js"
import logger from "#utils/logger.js"
import requestLogger from "#middlewares/requestLogger.js"
import notFoundHandler from "#middlewares/notFoundHandler.js"
import errorHandler from "#middlewares/errorHandler.js"

// Инициализация приложения
const app = express()

// Логгирование запросов
app.use(requestLogger)

// Парсинг JSON
app.use(express.json())

// CORS
app.use(cors({ origin: config("corsOrigin") }))

// Маршруты
app.use("/", routes)

// Обработка 404 ошибок (должен быть ПОСЛЕ всех маршрутов)
app.use(notFoundHandler)

// Обработка ошибок (должен быть последним)
app.use(errorHandler)

// Логгирование запуска приложения
logger.info("Приложение инициализировано", {
  corsOrigin: config("corsOrigin"),
  logLevel: config("logLevel")
})

export default app
