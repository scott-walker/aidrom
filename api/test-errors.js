import express from "express"
import { NotFoundError, ValidationError, UnauthorizedError } from "./src/utils/errors.js"
import { notFoundHandler } from "./src/middlewares/notFoundHandler.js"
import errorHandler from "./src/middlewares/errorHandler.js"

const app = express()

// Middleware для парсинга JSON
app.use(express.json())

// Тестовые маршруты для демонстрации ошибок
app.get("/test/not-found", (req, res, next) => {
  // Симулируем ошибку 404
  next(new NotFoundError("Пользователь с ID 123 не найден"))
})

app.get("/test/validation", (req, res, next) => {
  // Симулируем ошибку валидации
  next(new ValidationError("Email должен быть валидным"))
})

app.get("/test/unauthorized", (req, res, next) => {
  // Симулируем ошибку авторизации
  next(new UnauthorizedError("Требуется авторизация"))
})

app.get("/test/internal", (req, res, next) => {
  // Симулируем внутреннюю ошибку
  next(new Error("Что-то пошло не так"))
})

// Обработка 404 ошибок (должен быть ПОСЛЕ всех маршрутов)
app.use(notFoundHandler)

// Обработчик ошибок (должен быть последним)
app.use(errorHandler)

// Запуск сервера
const PORT = 3001
app.listen(PORT, () => {
  console.log(`🚀 Тестовый сервер запущен на http://localhost:${PORT}`)
  console.log("\n📋 Доступные тестовые маршруты:")
  console.log(`   GET http://localhost:${PORT}/test/not-found      - 404 ошибка`)
  console.log(`   GET http://localhost:${PORT}/test/validation     - 400 ошибка`)
  console.log(`   GET http://localhost:${PORT}/test/unauthorized   - 401 ошибка`)
  console.log(`   GET http://localhost:${PORT}/test/internal       - 500 ошибка`)
  console.log("\n🔍 Тестирование 404 ошибок (несуществующие маршруты):")
  console.log(`   GET http://localhost:${PORT}/api/nonexistent     - 404 ошибка`)
  console.log(`   POST http://localhost:${PORT}/unknown/route      - 404 ошибка`)
  console.log(`   PUT http://localhost:${PORT}/test/missing        - 404 ошибка`)
  console.log("\n💡 Используйте curl или браузер для тестирования")
})
