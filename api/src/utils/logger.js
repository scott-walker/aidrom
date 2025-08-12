import winston from "winston"
import DailyRotateFile from "winston-daily-rotate-file"
import config from "#config/index.js"

/**
 * Создает форматтер для логов
 * @returns {winston.Format} Форматтер логов
 */
const createLogFormat = () => {
  return winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.errors({ stack: true }),
    winston.format.json(),
    winston.format.printf(({ timestamp, level, message, stack, ...meta }) => {
      let log = `${timestamp} [${level.toUpperCase()}]: ${message}`

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
 * Создает транспорты для логгера
 * @returns {Array} Массив транспортов
 */
const createTransports = () => {
  const transports = []

  // Консольный транспорт
  transports.push(
    new winston.transports.Console({
      format: winston.format.combine(winston.format.colorize(), winston.format.simple())
    })
  )

  // Файловый транспорт с ротацией
  transports.push(
    new DailyRotateFile({
      filename: config("logFile").replace(".log", "-%DATE%.log"),
      datePattern: "YYYY-MM-DD",
      maxSize: "20m",
      maxFiles: "14d",
      format: createLogFormat()
    })
  )

  return transports
}

/**
 * Получает название метода из стека вызовов
 * @returns {string} Название метода
 */
const getMethodName = () => {
  const stack = new Error().stack
  const callerLine = stack.split("\n")[3]
  const match = callerLine.replace("Module.", "").match(/at\s+(\w+)\s+\(/)

  return match ? match[1] : "unknown"
}

/**
 * Основной логгер приложения
 */
const logger = winston.createLogger({
  level: config("logLevel"),
  format: createLogFormat(),
  transports: createTransports(),
  exitOnError: false
})

/**
 * Логгер для HTTP запросов
 */
export const httpLogger = winston.createLogger({
  level: "info",
  format: createLogFormat(),
  transports: createTransports(),
  defaultMeta: { service: "http" }
})

/**
 * Логгер для работы с базой данных
 */
export const dbLogger = winston.createLogger({
  level: "info",
  format: createLogFormat(),
  transports: createTransports(),
  defaultMeta: { service: "database" }
})

/**
 * Логгер для работы с AI API
 */
export const aiLogger = winston.createLogger({
  level: "info",
  format: createLogFormat(),
  transports: createTransports(),
  defaultMeta: { service: "ai-api" }
})

/**
 * Создает логгер для контроллеров
 * @param {string} controllerName - Название контроллера
 * @returns {Object} Логгер с методами info, warn, error
 */
export const createControllerLogger = (controllerName) => {
  const controllerLogger = winston.createLogger({
    level: "info",
    format: createLogFormat(),
    transports: createTransports(),
    defaultMeta: { service: "controller", controller: controllerName }
  })

  return {
    info: (message, meta = {}) => {
      const methodName = getMethodName()
      controllerLogger.info(`[${controllerName}.${methodName}] ${message}`, meta)
    },
    warn: (message, meta = {}) => {
      const methodName = getMethodName()
      controllerLogger.warn(`[${controllerName}.${methodName}] ${message}`, meta)
    },
    error: (message, meta = {}) => {
      const methodName = getMethodName()
      controllerLogger.error(`[${controllerName}.${methodName}] ${message}`, meta)
    }
  }
}

/**
 * Создает логгер для сервисов
 * @param {string} serviceName - Название сервиса
 * @returns {Object} Логгер с методами info, warn, error
 */
export const createServiceLogger = (serviceName) => {
  const serviceLogger = winston.createLogger({
    level: "info",
    format: createLogFormat(),
    transports: createTransports(),
    defaultMeta: { service: "service", service: serviceName }
  })

  return {
    info: (message, meta = {}) => {
      const methodName = getMethodName()
      serviceLogger.info(`[${serviceName}.${methodName}] ${message}`, meta)
    },
    warn: (message, meta = {}) => {
      const methodName = getMethodName()
      serviceLogger.warn(`[${serviceName}.${methodName}] ${message}`, meta)
    },
    error: (message, meta = {}) => {
      const methodName = getMethodName()
      serviceLogger.error(`[${serviceName}.${methodName}] ${message}`, meta)
    }
  }
}

export default logger
