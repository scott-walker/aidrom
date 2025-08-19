import { dumpConfig } from "#config/index.js"

// Конфигурация
dumpConfig()

// Переменные окружения
console.group("ENV:")
console.log(process.env)
console.groupEnd()
