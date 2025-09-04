import { Pool } from "pg"
import { drizzle } from "drizzle-orm/node-postgres"
import { getConfigParam } from "@config"
import { createDbLogger } from "@utils/logger"
import * as schema from "./schema"

/**
 * Создать соединение с БД
 * @namespace DB.Connection
 */
export const createConnection = () => {
  const logger = createDbLogger()
  const pool = new Pool({ connectionString: getConfigParam("dbUrl") as string })

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

  return drizzle(pool, { schema, logger })
}
