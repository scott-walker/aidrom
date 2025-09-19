import dotenv from "dotenv"
import dotenvExpand from "dotenv-expand"
import { resolve } from "path"
import type { AppConfig, AppConfigKey, AppConfigParam } from "./types"

// Загружаем переменные окружения (для использования ${VAR} в .env)
dotenvExpand.expand(dotenv.config())

/**
 * Корневой каталог проекта
 */
const rootDir: string = process.env.ROOT_DIR || "/app"

/**
 * Корневой каталог приложения
 */
const srcDir: string = resolve(rootDir, "src")

/**
 * Каталог для хранения временных служебных файлов
 */
const runtimeDir: string = process.env.RUNTIME_DIR || resolve(rootDir, "runtime")

/**
 * Каталог для хранения логов
 */
const logDir: string = process.env.LOG_DIR || resolve(rootDir, "logs")

/**
 * Каталог для хранения статических файлов
 */
const staticDir: string = process.env.STATIC_DIR || resolve(rootDir, "static")

/**
 * Каталог для работы с БД
 */
const dbDir: string = resolve(srcDir, "db")

/**
 * Конфигурация проекта
 * @namespace Config.config
 */
const config: AppConfig = {
  rootDir,
  srcDir,
  runtimeDir,
  logDir,
  staticDir,
  dbDir,

  // Параметры для запуска сервиса
  host: process.env.HOST || "localhost",
  port: parseInt(process.env.PORT || "3000"),

  // Урл для подключения к БД
  dbUrl: process.env.DB_CONNECTION_URL,

  // CORS
  corsOrigin: process.env.CORS_ORIGIN || "*",

  // Логирование
  logFile: resolve(logDir, "api.log"),
  logMetaDir: resolve(runtimeDir, "winston"),
  logLevel: process.env.LOG_LEVEL || "info",

  // Работа со статикой
  static: {
    maxAge: "1h",
    etag: true,
    lastModified: true,
    index: false,
    dotfiles: "deny"
  }
}

/**
 * Получение параметра конфигурации
 * @namespace Config.getConfigParam
 */
export const getConfigParam = <K extends AppConfigKey>(key: K): AppConfigParam<K> => {
  if (!config.hasOwnProperty(key)) {
    throw new Error(`Недоступный параметр конфигурации ${key}`)
  }

  return config[key]
}

/**
 * Валить конфигурацию в консоль
 * @namespace Config.dumpConfig
 */
export const dumpConfig = () => {
  console.group("CONFIG:")
  console.log(config)
  console.groupEnd()
}
