/**
 * Сервис для работы с запросами
 * @namespace Request.Service
 */

import { eq, desc } from "drizzle-orm"
import { db, requests, Request, CreateRequestData, RequestWithProvider } from "@db"
import { createServiceLogger } from "@utils/logger"
import { NotFoundError } from "@utils/errors"

// Создаем логгер для сервиса запросов
const logger = createServiceLogger("RequestService")

/**
 * Получить все запросы из базы данных
 * @namespace Request.Service.getRequests
 */
export const getRequests = async (): Promise<Request[]> => {
  try {
    logger.info("Получение всех запросов из БД")

    const items = await db.query.requests.findMany({
      orderBy: [desc(requests.createdAt)],
      with: {
        provider: true
      }
    })

    logger.info("Запрос к БД выполнен успешно", { count: items.length })

    return items
  } catch (error) {
    logger.error("Ошибка при получении всех запросов из БД", { error: error.message })

    throw error
  }
}

/**
 * Получить запрос по его идентификатору
 * @namespace Request.Service.getRequestById
 */
export const getRequestById = async (requestId: number): Promise<RequestWithProvider> => {
  try {
    logger.info("Получение запроса по ID", { requestId })

    const requestItem = await db.query.requests.findFirst({
      where: eq(requests.id, requestId),
      with: {
        provider: true
      }
    })

    if (!requestItem) {
      throw new NotFoundError(`Запрос с ID #${requestId} не найден`)
    }

    logger.info("Запрос по ID успешно найден", { requestId })

    return requestItem
  } catch (error) {
    logger.error("Ошибка при получении запроса по ID", { error: error.message, requestId })

    throw error
  }
}

/**
 * Создать новый запрос
 * @namespace Request.Service.createRequest
 */
export const createRequest = async (data: CreateRequestData): Promise<Request> => {
  try {
    logger.info("Создание нового запроса в БД", data)

    const [requestItem] = await db.insert(requests).values(data).returning()

    logger.info("Запрос успешно создан", { requestId: requestItem.id })

    return requestItem
  } catch (error) {
    logger.error("Ошибка при создании запроса", { error: error.message, data })

    throw error
  }
}
