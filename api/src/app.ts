import express from "express"
import cors from "cors"
import { getConfigParam } from "@config"
import { router } from "@router"
import logger from "@utils/logger.js"
import requestLogger from "@middlewares/requestLogger.js"
import notFoundHandler from "@middlewares/notFoundHandler.js"
import errorHandler from "@middlewares/errorHandler.js"

// Инициализация приложения
const app = express()

// Логгирование запросов
app.use(requestLogger)

// Парсинг JSON
app.use(express.json())

// CORS
app.use(cors({ origin: getConfigParam("corsOrigin") }))

// Маршруты
app.use(router)

// Обработка 404 ошибок (должен быть ПОСЛЕ всех маршрутов)
app.use(notFoundHandler)

// Обработка ошибок (должен быть последним)
app.use(errorHandler)

// Логгирование запуска приложения
logger.info("Приложение инициализировано", {
  corsOrigin: getConfigParam("corsOrigin"),
  logLevel: getConfigParam("logLevel")
})

export default app
