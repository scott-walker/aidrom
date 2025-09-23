/**
 * Сервис для работы с запросами
 * @namespace Request.Service
 */

import { eq, desc, asc, like, SQL, and } from "drizzle-orm"
import { db, requests, Request, CreateRequestData, RequestWithProvider } from "@db"
import { createServiceLogger } from "@utils/logger"
import { NotFoundError } from "@utils/errors"

// Создаем логгер для сервиса запросов
const logger = createServiceLogger("RequestService")

/**
 * Создание параметров фильтрации
 * @namespace Request.Service.createFilters
 */
const createFilters = (data?: RequestsFilterData): RequestsFilter => {
  data = data ?? {}

  const sortField = data.sortField ?? "createdAt"
  const orderBy = data.sortOrder === "asc" ? asc(requests[sortField]) : desc(requests[sortField])
  const where: SQL<unknown>[] = []

  if (data.providerId) {
    where.push(eq(requests.providerId, Number(data.providerId)))
  }
  if (data.searchById) {
    where.push(like(requests.providerRequestId, `%${data.searchById}%`))
  }

  return {
    where: where.length > 0 ? and(...where) : undefined,
    orderBy: [orderBy]
  }
}

/**
 * Тип сортировки
 * @namespace Request.Service.SortOrder
 */
export type SortOrder = "asc" | "desc"

/**
 * Параметры фильтрации
 * @namespace Request.Service.RequestsFilterData
 */
export interface RequestsFilterData {
  providerId?: string
  searchById?: string
  sortField?: string
  sortOrder?: SortOrder
}

/**
 * Параметры фильтрации
 * @namespace Request.Service.RequestsFilter
 */
export interface RequestsFilter {
  where: SQL<unknown> | undefined
  orderBy: SQL<unknown>[]
}

/**
 * Нормализация данных
 * @namespace Request.Service.normalizeData
 */
export const normalizeData = (data?: RequestsFilterData): RequestsFilterData => {
  data = data ?? {}

  return {
    providerId: data.providerId ? String(data.providerId) : undefined,
    searchById: data.searchById ? String(data.searchById) : undefined,
    sortField: data.sortField ? String(data.sortField) : "createdAt",
    sortOrder: data.sortOrder ? (String(data.sortOrder) as SortOrder) : "desc"
  }
}

/**
 * Получить все запросы из базы данных
 * @namespace Request.Service.getRequests
 */
export const getRequests = async (filters?: RequestsFilterData): Promise<Request[]> => {
  try {
    logger.info("Получение всех запросов из БД")

    const { where, orderBy } = createFilters(filters)
    const items = await db.query.requests.findMany({
      orderBy,
      where,
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
