import "dotenv/config"
import { resolve } from "path"

/**
 * Корневой каталог проекта
 * @type {String}
 */
const rootDir = resolve(import.meta.dirname, "..")

/**
 * Конфигурация проекта
 * @type {Object}
 */
const config = {
  rootDir,
  port: process.env.PORT || 3000,
  dbUrl: process.env.DATABASE_URL,
  corsOrigin: process.env.CORS_ORIGIN || "*",
  genApiBaseUrl: process.env.GEN_API_BASE_URL,
  genApiKey: process.env.GEN_API_CLIENT_KEY,
  logLevel: process.env.LOG_LEVEL || "info",
  logFile: resolve(rootDir, process.env.LOG_FILE || "../logs/app.log"),
  logMetaDir: resolve(rootDir, process.env.LOG_META_DIR || "../runtime/winston")
}

/**
 * Получение параметра конфигурации
 * @param {String} key ключ параметра
 * @returns {String} значение параметра
 */
const getParam = (key) => {
  if (!config.hasOwnProperty(key)) {
    throw new Error(`Недоступный параметр конфигурации ${key}`)
  }

  return config[key]
}

export default getParam
