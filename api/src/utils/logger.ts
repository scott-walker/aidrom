import winston from "winston"
import DailyRotateFile from "winston-daily-rotate-file"
import { mkdir } from "fs/promises"
import { dirname } from "path"
import { getConfigParam } from "@config"

/**
 * Интерфейс логгера
 * @namespace Utils.ILogger
 */
export interface ILogger {
  info: (message: string, meta?: ILoggerMeta) => void
  warn: (message: string, meta?: ILoggerMeta) => void
  error: (message: string, meta?: ILoggerMeta) => void
}

/**
 * Интерфейс логгера для БД
 * @namespace Utils.IDbLogger
 */
export interface IDbLogger extends ILogger {
  logQuery: (query: string, params: Record<string, unknown>) => void
}

/**
 * Интерфейс метаданных логгера
 * @namespace Utils.ILoggerMeta
 */
export interface ILoggerMeta {
  action?: string
  method?: string
  status?: string
  error?: string
  data?: Record<string, unknown>
  [key: string]: unknown
}

/**
 * Интерфейс метаданных логгера для HTTP
 * @namespace Utils.IHttpLoggerMeta
 */
export interface IHttpLoggerMeta extends ILoggerMeta {
  ip?: string
  host?: string
  scheme?: string
  duration?: string
  statusCode?: string
  params?: Record<string, unknown>
  query?: Record<string, unknown>
  headers?: Record<string, unknown>
  responseSize?: number
  url?: string
}

/**
 * Создать директории для логов и метаданных
 */
const makeDirectories = async (): Promise<void> => {
  try {
    const logDir = dirname(getConfigParam("logFile"))
    const metaDir = getConfigParam("logMetaDir")

    await mkdir(logDir, { recursive: true })
    await mkdir(metaDir, { recursive: true })
  } catch (error) {
    console.error("Ошибка при создании директорий логов:", error.message)
  }
}

/**
 * Создать форматтер для логов
 * @returns {winston.Format} Форматтер логов
 */
const createLogFormat = (): winston.Logform.Format => {
  return winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.errors({ stack: true }),
    winston.format.json(),
    winston.format.printf(({ timestamp, level, message, stack, ...meta }) => {
      const layer = meta.layer || "APP"

      let log = `${timestamp} [${level.toUpperCase()}]: ${layer} :: ${message}`

      if (Object.keys(meta).length > 0) {
        log += ` ${JSON.stringify(meta)}`
      }

      if (stack) {
        log += `\n${stack}`
      }

      return log
    })
  )
}

/**
 * Создать транспорты для логгера
 * @namespace Utils.createTransports
 * @param {string} fileMarker - Маркер для файла логов
 */
const createTransports = (fileMarker: string): winston.transport[] => {
  const transports: winston.transport[] = []
  const logFile = fileMarker
    ? getConfigParam("logFile").replace(".log", `-${fileMarker}.log`)
    : getConfigParam("logFile")

  // Консольный транспорт
  transports.push(
    new winston.transports.Console({
      format: winston.format.combine(winston.format.splat())
    })
  )

  // Файловый транспорт с ротацией
  transports.push(
    new DailyRotateFile({
      filename: logFile.replace(".log", "-%DATE%.log"),
      datePattern: "YYYY-MM-DD",
      maxSize: "20m",
      maxFiles: "14d",
      format: createLogFormat(),
      auditFile: getConfigParam("logMetaDir") + "/audit.json",
      zippedArchive: true
    })
  )

  return transports
}

/**
 * Получить название метода из стека вызовов
 * @param {string} defaultName - Название метода по умолчанию
 * @returns {string} Название метода
 */
const getMethodName = (defaultName: string = "unknown"): string => {
  const stack = new Error().stack
  const callerLine = stack.split("\n")[3]
  const match = callerLine.replace("Module.", "").match(/at\s+(\w+)\s+\(/)

  return match ? match[1] : defaultName
}

/**
 * Создать логгер для приложения
 * @namespace Utils.createAppLogger
 */
const createAppLogger = (): ILogger => {
  const logger = winston.createLogger({
    level: getConfigParam("logLevel"),
    format: createLogFormat(),
    transports: createTransports("app"),
    defaultMeta: { layer: "APP" },
    exitOnError: false
  })

  return logger
}

/**
 * Создать логгер для HTTP запросов
 * @namespace Utils.createHttpLogger
 */
export const createHttpLogger = (): ILogger => {
  const logger = winston.createLogger({
    level: "info",
    format: createLogFormat(),
    transports: createTransports("http"),
    defaultMeta: { layer: "HTTP" }
  })

  /**
   * Обернуть обработчик логов
   * @param {ILogger[K]} handler - Обработчик логов
   */
  const wrap = <K extends keyof ILogger>(handler: ILogger[K]): ILogger[K] => {
    return (message, meta: IHttpLoggerMeta = {}) => {
      const normalizedMeta: IHttpLoggerMeta = {}

      const httpMethod = meta.method || null
      const httpCode = meta.statusCode ? `[${meta.statusCode}]` : null
      const httpIp = meta.ip || null
      const httpHost = meta.host || null
      const httpScheme = meta.scheme || null
      const httpUrl = meta.url || null
      const httpDuration = meta.duration ? `(${meta.duration})` : null
      let httpFullUrl = null

      if (httpScheme && httpHost && httpUrl) {
        httpFullUrl = `${httpScheme}://${httpHost}${httpUrl}`
      }

      if (meta.params) normalizedMeta.params = meta.params
      if (meta.query) normalizedMeta.query = meta.query
      if (meta.headers) normalizedMeta.headers = meta.headers
      if (meta.responseSize) normalizedMeta.responseSize = meta.responseSize

      /**
       * Собрать информацию о запросе
       */
      const compileInfo = (): string => {
        const info = [httpDuration, httpIp, httpCode, httpMethod, httpFullUrl].filter(Boolean).join(" ")

        return info || "<unknown>"
      }

      return handler(`${compileInfo()} :: ${message}`, normalizedMeta)
    }
  }

  return {
    info: wrap(logger.info),
    warn: wrap(logger.warn),
    error: wrap(logger.error)
  }
}

/**
 * Создать логгер для работы с базой данных
 * @namespace Utils.createDbLogger
 */
export const createDbLogger = (): IDbLogger => {
  const logger = winston.createLogger({
    level: "info",
    format: createLogFormat(),
    transports: createTransports("database"),
    defaultMeta: { layer: "DB" }
  })

  // Для drizzle
  const logQuery: IDbLogger["logQuery"] = (query, params) => {
    logger.info(`[QUERY] ${query}`, { params })
  }

  return { ...logger, logQuery }
}

/**
 * Создать логгер для отправщиков сообщений
 * @namespace Utils.createSenderLogger
 */
export const createSenderLogger = (): ILogger => {
  const logger = winston.createLogger({
    level: "info",
    format: createLogFormat(),
    transports: createTransports("sender"),
    defaultMeta: { layer: "SENDER" }
  })

  return {
    info: (message, meta = {}) => {
      logger.info(`[SENDER.${getMethodName()}] ${message}`, meta)
    },
    warn: (message, meta = {}) => {
      logger.warn(`[SENDER.${getMethodName()}] ${message}`, meta)
    },
    error: (message, meta = {}) => {
      logger.error(`[SENDER.${getMethodName()}] ${message}`, meta)
    }
  }
}

/**
 * Создать логгер для API
 * @namespace Utils.createApiLogger
 * @param {string} apiName - Название API
 */
export const createApiLogger = (apiName: string): ILogger => {
  const logger = winston.createLogger({
    level: "info",
    format: createLogFormat(),
    transports: createTransports("api"),
    defaultMeta: { layer: "API", api: apiName }
  })

  return {
    info: (message, meta = {}) => {
      const methodName = getMethodName(meta.action)
      logger.info(`[${apiName}.${methodName}] ${message}`, meta)
    },
    warn: (message, meta = {}) => {
      const methodName = getMethodName(meta.action)
      logger.warn(`[${apiName}.${methodName}] ${message}`, meta)
    },
    error: (message, meta = {}) => {
      const methodName = getMethodName(meta.action)
      logger.error(`[${apiName}.${methodName}] ${message}`, meta)
    }
  }
}

/**
 * Создать логгер для контроллеров
 * @namespace Utils.createControllerLogger
 * @param {string} controllerName - Название контроллера
 */
export const createControllerLogger = (controllerName: string): ILogger => {
  const logger = winston.createLogger({
    level: "info",
    format: createLogFormat(),
    transports: createTransports("controller"),
    defaultMeta: { layer: "CONTROLLER", controller: controllerName }
  })

  return {
    info: (message, meta = {}) => {
      logger.info(`[${controllerName}.${getMethodName()}] ${message}`, meta)
    },
    warn: (message, meta = {}) => {
      logger.warn(`[${controllerName}.${getMethodName()}] ${message}`, meta)
    },
    error: (message, meta = {}) => {
      logger.error(`[${controllerName}.${getMethodName()}] ${message}`, meta)
    }
  }
}

/**
 * Создать логгер для сервисов
 * @namespace Utils.createServiceLogger
 * @param {string} service - Название сервиса
 */
export const createServiceLogger = (service: string): ILogger => {
  const logger = winston.createLogger({
    level: "info",
    format: createLogFormat(),
    transports: createTransports("service"),
    defaultMeta: { layer: "SERVICE", service }
  })

  return {
    info: (message, meta = {}) => {
      logger.info(`[${service}.${getMethodName()}] ${message}`, meta)
    },
    warn: (message, meta = {}) => {
      logger.warn(`[${service}.${getMethodName()}] ${message}`, meta)
    },
    error: (message, meta = {}) => {
      logger.error(`[${service}.${getMethodName()}] ${message}`, meta)
    }
  }
}

// Создать директории при инициализации
makeDirectories()

export default createAppLogger()
