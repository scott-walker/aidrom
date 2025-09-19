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
  info: (message: string, data?: ILoggerMetaData) => void
  warn: (message: string, data?: ILoggerMetaData) => void
  error: (message: string, data?: ILoggerMetaData) => void
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
 * @namespace Utils.ILoggerMetaData
 */
export interface ILoggerMetaData {
  action?: string
  method?: string
  status?: string
  error?: string
  data?: Record<string, unknown>
  [key: string]: unknown
}

/**
 * Интерфейс метаданных логгера для HTTP
 * @namespace Utils.IHttpLoggerMetaData
 */
export interface IHttpLoggerMetaData extends ILoggerMetaData {
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
    return (message, data: IHttpLoggerMetaData = {}) => {
      const normalizedData: IHttpLoggerMetaData = {}

      const httpMethod = data.method || null
      const httpCode = data.statusCode ? `[${data.statusCode}]` : null
      const httpIp = data.ip || null
      const httpHost = data.host || null
      const httpScheme = data.scheme || null
      const httpUrl = data.url || null
      const httpDuration = data.duration ? `(${data.duration})` : null
      let httpFullUrl = null

      if (httpScheme && httpHost && httpUrl) {
        httpFullUrl = `${httpScheme}://${httpHost}${httpUrl}`
      }

      if (data.params) normalizedData.params = data.params
      if (data.query) normalizedData.query = data.query
      if (data.headers) normalizedData.headers = data.headers
      if (data.responseSize) normalizedData.responseSize = data.responseSize

      /**
       * Собрать информацию о запросе
       */
      const compileInfo = (): string => {
        const info = [httpDuration, httpIp, httpCode, httpMethod, httpFullUrl].filter(Boolean).join(" ")

        return info || "<unknown>"
      }

      return handler(`${compileInfo()} :: ${message}`, { data: normalizedData })
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

  return {
    info: (message, data = {}) => {
      logger.info(`[DB.${getMethodName()}] ${message}`, { data })
    },
    warn: (message, data = {}) => {
      logger.warn(`[DB.${getMethodName()}] ${message}`, { data })
    },
    error: (message, data = {}) => {
      logger.error(`[DB.${getMethodName()}] ${message}`, { data })
    },
    logQuery: (query, params) => logger.info(`[DB.QUERY] ${query}`, { params })
  }
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
    info: (message, data = {}) => {
      logger.info(`[SENDER] ${message}`, { data })
    },
    warn: (message, data = {}) => {
      logger.warn(`[SENDER] ${message}`, { data })
    },
    error: (message, data = {}) => {
      logger.error(`[SENDER] ${message}`, { data })
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
    info: (message, data = {}) => {
      const methodName = getMethodName(data.action)

      delete data.action
      logger.info(`[${apiName}.${methodName}] ${message}`, { data })
    },
    warn: (message, data = {}) => {
      const methodName = getMethodName(data.action)

      delete data.action
      logger.warn(`[${apiName}.${methodName}] ${message}`, { data })
    },
    error: (message, data = {}) => {
      const methodName = getMethodName(data.action)

      delete data.action
      logger.error(`[${apiName}.${methodName}] ${message}`, { data })
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
    info: (message, data = {}) => {
      logger.info(`[${controllerName}.${getMethodName()}] ${message}`, { data })
    },
    warn: (message, data = {}) => {
      logger.warn(`[${controllerName}.${getMethodName()}] ${message}`, { data })
    },
    error: (message, data = {}) => {
      logger.error(`[${controllerName}.${getMethodName()}] ${message}`, { data })
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
    info: (message, data = {}) => {
      logger.info(`[${service}.${getMethodName()}] ${message}`, { data })
    },
    warn: (message, data = {}) => {
      logger.warn(`[${service}.${getMethodName()}] ${message}`, { data })
    },
    error: (message, data = {}) => {
      logger.error(`[${service}.${getMethodName()}] ${message}`, { data })
    }
  }
}

// Создать директории при инициализации
makeDirectories()

export default createAppLogger()
