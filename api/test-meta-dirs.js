import { createControllerLogger, createServiceLogger } from "./src/utils/logger.js"
import { readdir } from "fs/promises"
import { existsSync } from "fs"

console.log("=== Тест директорий метаданных ===\n")

// Тест логгирования
const userController = createControllerLogger("UserController")

const testLogging = () => {
  userController.info("Тест логгирования с метаданными", { test: true })
  userController.warn("Предупреждение", { level: "warning" })
  userController.error("Ошибка", { error: "test error" })
}

testLogging()

// Проверяем создание директорий
setTimeout(async () => {
  try {
    console.log("Проверка структуры директорий:")

    const logsExists = existsSync("./logs")
    console.log(`📁 logs/ директория: ${logsExists ? "✅ существует" : "❌ не существует"}`)

    if (logsExists) {
      const logsContent = await readdir("./logs")
      console.log(`📄 Содержимое logs/: ${logsContent.join(", ")}`)

      const metaExists = existsSync("./logs/meta")
      console.log(`📁 logs/meta/ директория: ${metaExists ? "✅ существует" : "❌ не существует"}`)

      if (metaExists) {
        const metaContent = await readdir("./logs/meta")
        console.log(`📄 Содержимое logs/meta/: ${metaContent.join(", ")}`)
      }
    }

    console.log("\n=== Тест завершен ===")
  } catch (error) {
    console.error("Ошибка при проверке директорий:", error.message)
  }
}, 1000)
