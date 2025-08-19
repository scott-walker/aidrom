import "dotenv/config"
import { resolve } from "path"

/**
 * Корневой каталог приложения
 * @type {String}
 */
const srcDir = resolve(import.meta.dirname, "..")

/**
 * Каталог для хранения временных служебных файлов
 * @type {String}
 */
const runtimeDir = resolve(process.env.RUNTIME_DIR || "/app/runtime")

/**
 * Каталог для хранения логов
 * @type {String}
 */
const logDir = resolve(process.env.LOG_DIR || "/app/logs")

/**
 * Каталог для работы с БД
 * @type {String}
 */
const dbDir = resolve(srcDir, "db")

/**
 * Конфигурация проекта
 * @type {Object}
 */
const config = {
  srcDir,
  runtimeDir,
  logDir,
  dbDir,

  // Параметры для запуска сервиса
  host: process.env.HOST || "localhost",
  port: process.env.PORT || 3000,

  // Урл для подключения к БД
  dbUrl: process.env.DB_CONNECTION_URL,

  // CORS
  corsOrigin: process.env.CORS_ORIGIN || "*",

  // Логирование
  logFile: resolve(logDir, "api.log"),
  logMetaDir: resolve(runtimeDir, "winston"),
  logLevel: process.env.LOG_LEVEL || "info",

  // Интеграции
  integration: {
    // https://gen-api.ru
    GenAPI: {
      baseUrl: process.env.INTEGRATION_GEN_API_BASE_URL,
      key: process.env.INTEGRATION_GEN_API_KEY
    }
  }
}

/**
 * Получение параметра конфигурации
 * @param {String} key ключ параметра
 * @returns {String} значение параметра
 */
const getParam = key => {
  if (!config.hasOwnProperty(key)) {
    throw new Error(`Недоступный параметр конфигурации ${key}`)
  }

  return config[key]
}

/**
 * Валить конфигурацию в консоль
 */
export const dumpConfig = () => {
  console.group("CONFIG:")
  console.log(config)
  console.groupEnd()
}

export default getParam
