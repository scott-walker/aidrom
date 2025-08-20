import { Pool } from "pg"
import { drizzle } from "drizzle-orm/node-postgres"
import * as schema from "#db/schema/index.js"
import config from "#config/index.js"
import { createDbLogger } from "#utils/logger.js"

const logger = createDbLogger()
const pool = new Pool({ connectionString: config("dbUrl") })

logger.info("Подключение к БД инициализировано")

// Логгирование соединения с БД
pool.on("connect", () => logger.info("Подключение к БД установлено"))
pool.on("remove", () => logger.info("Подключение к БД закрыто"))
pool.on("error", err => {
  logger.error("Ошибка подключения к БД", {
    error: err.message,
    stack: err.stack
  })
})

export const db = drizzle(pool, { schema, logger })
