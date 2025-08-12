import express from "express"
import { notFoundHandler } from "./src/middlewares/notFoundHandler.js"
import errorHandler from "./src/middlewares/errorHandler.js"

const app = express()

// Middleware для парсинга JSON
app.use(express.json())

// Только один существующий маршрут
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "Сервер работает" })
})

// Обработка 404 ошибок (должен быть ПОСЛЕ всех маршрутов)
app.use(notFoundHandler)

// Обработчик ошибок (должен быть последним)
app.use(errorHandler)

// Запуск сервера
const PORT = 3002
app.listen(PORT, () => {
  console.log(`🚀 Тестовый сервер 404 запущен на http://localhost:${PORT}`)
  console.log("\n✅ Существующий маршрут:")
  console.log(`   GET http://localhost:${PORT}/api/health`)
  console.log("\n❌ Несуществующие маршруты (будут возвращать 404):")
  console.log(`   GET http://localhost:${PORT}/api/users`)
  console.log(`   POST http://localhost:${PORT}/api/posts`)
  console.log(`   PUT http://localhost:${PORT}/unknown/route`)
  console.log(`   DELETE http://localhost:${PORT}/test/anything`)
  console.log("\n💡 Используйте curl для тестирования:")
  console.log(`   curl http://localhost:${PORT}/api/health`)
  console.log(`   curl http://localhost:${PORT}/api/nonexistent`)
})
