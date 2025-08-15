import { Pool } from "pg"
import { drizzle } from "drizzle-orm/node-postgres"
import * as schema from "#db/schema/index.js"
import config from "#config/index.js"
import { dbLogger } from "#utils/logger.js"

const pool = new Pool({
  connectionString: config("dbUrl")
})

// Логгирование событий подключения к БД
pool.on("connect", () => {
  dbLogger.info("Подключение к БД установлено")
})
pool.on("error", err => {
  dbLogger.error("Ошибка подключения к БД", {
    error: err.message,
    stack: err.stack
  })
})
pool.on("remove", () => {
  dbLogger.info("Подключение к БД закрыто")
})

export const db = drizzle(pool, { schema })

dbLogger.info("Подключение к БД инициализировано")
