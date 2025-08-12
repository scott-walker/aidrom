import winston from "winston"
import DailyRotateFile from "winston-daily-rotate-file"
import { mkdir } from "fs/promises"
import { dirname } from "path"
import config from "#config/index.js"

/**
 * Создает директории для логов и метаданных если они не существуют
 */
const ensureLogDirectories = async () => {
  try {
    const logDir = dirname(config("logFile"))
    const metaDir = config("logMetaDir")

    await mkdir(logDir, { recursive: true })
    await mkdir(metaDir, { recursive: true })
  } catch (error) {
    console.error("Ошибка при создании директорий логов:", error.message)
  }
}

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
 * Создает транспорты для логгера
 * @returns {Array} Массив транспортов
 */
const createTransports = (fileMarker) => {
  const transports = []
  const logFile = fileMarker ? config("logFile").replace(".log", `-${fileMarker}.log`) : config("logFile")

  // Консольный транспорт
  transports.push(
    new winston.transports.Console({
      format: winston.format.combine(winston.format.colorize(), winston.format.simple())
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
      auditFile: config("logMetaDir") + "/audit.json",
      zippedArchive: true
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

// Создаем директории при инициализации
ensureLogDirectories()

// Создаем логгер приложения
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
  defaultMeta: { layer: "HTTP" }
})

/**
 * Логгер для работы с базой данных
 */
export const dbLogger = winston.createLogger({
  level: "info",
  format: createLogFormat(),
  transports: createTransports(),
  defaultMeta: { layer: "DB" }
})

/**
 * Логгер для работы с AI API
 */
export const apiLogger = winston.createLogger({
  level: "info",
  format: createLogFormat(),
  transports: createTransports(),
  defaultMeta: { layer: "API" }
})

/**
 * Создает логгер для контроллеров
 * @param {string} controllerName - Название контроллера
 * @returns {Object} Логгер с методами info, warn, error
 */
export const createControllerLogger = (controllerName) => {
  const logger = winston.createLogger({
    level: "info",
    format: createLogFormat(),
    transports: createTransports(),
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
 * Создает логгер для сервисов
 * @param {string} serviceName - Название сервиса
 * @returns {Object} Логгер с методами info, warn, error
 */
export const createServiceLogger = (serviceName) => {
  const logger = winston.createLogger({
    level: "info",
    format: createLogFormat(),
    transports: createTransports(),
    defaultMeta: { layer: "SERVICE", service: serviceName }
  })

  return {
    info: (message, meta = {}) => {
      logger.info(`[${serviceName}.${getMethodName()}] ${message}`, meta)
    },
    warn: (message, meta = {}) => {
      logger.warn(`[${serviceName}.${getMethodName()}] ${message}`, meta)
    },
    error: (message, meta = {}) => {
      logger.error(`[${serviceName}.${getMethodName()}] ${message}`, meta)
    }
  }
}

/**
 * Создает логгер для AI клиентов
 * @param {string} clientName - Название клиента
 * @returns {Object} Логгер с методами info, warn, error
 */
export const createClientLogger = (clientName) => {
  const fileMarker = "client-" + clientName.replace("Client", "").toLowerCase()
  const logger = winston.createLogger({
    level: "info",
    format: createLogFormat(),
    transports: createTransports(fileMarker),
    defaultMeta: { layer: "CLIENT", client: clientName }
  })

  return {
    info: (message, meta = {}) => {
      logger.info(`[${clientName}] ${message}`, meta)
    },
    warn: (message, meta = {}) => {
      logger.warn(`[${clientName}] ${message}`, meta)
    },
    error: (message, meta = {}) => {
      logger.error(`[${clientName}] ${message}`, meta)
    }
  }
}

export default logger
