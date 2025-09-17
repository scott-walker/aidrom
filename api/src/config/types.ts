/**
 * Тип конфига для приложения
 * @namespace Config.types.AppConfig
 */
export type AppConfig = {
  rootDir: string
  srcDir: string
  runtimeDir: string
  logDir: string
  staticDir: string
  dbDir: string
  host: string
  port: number
  dbUrl: string
  corsOrigin: string
  logFile: string
  logMetaDir: string
  logLevel: string
  static: Record<string, unknown>
}

/**
 * Тип ключа конфигурации
 * @namespace Config.types.AppConfigKey
 */
export type AppConfigKey = keyof AppConfig

/**
 * Тип параметра конфигурации
 * @namespace Config.types.AppConfigParam
 */
export type AppConfigParam = AppConfig[AppConfigKey]
