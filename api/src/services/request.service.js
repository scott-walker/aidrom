/**
 * Сервис для работы с запросами к AI
 * @namespace Request.Service
 */

import { eq } from "drizzle-orm"
import { db } from "#db/index.js"
import { requests } from "#db/schema/requests.js"
import { createServiceLogger } from "#utils/logger.js"
import { ApiError, NotFoundError } from "#utils/errors.js"
import { PromptResponse } from "#utils/api.js"
import clients from "#clients/index.js"

// Создаем логгер для сервиса запросов
const logger = createServiceLogger("RequestService")

/**
 * Получает все запросы из базы данных
 * @memberof Request.Service
 * @returns {Promise<Array<Object>>} Массив объектов с информацией о запросах.
 */
export const getRequests = async () => {
  try {
    logger.info("Получение всех запросов из БД")

    const items = await db.select().from(requests)

    logger.info("Запрос к БД выполнен успешно", {
      count: items.length
    })

    return items
  } catch (error) {
    logger.error("Ошибка при получении всех запросов из БД", {
      error: error.message
    })

    throw error
  }
}

/**
 * Создает новый запрос к AI-боту и сохраняет его в БД
 * @memberof Request.Service
 * @param {String} bot - Бот-клиент для отправки запроса к AI
 * @param {String} prompt - Текст запроса к AI
 * @returns {Promise<Array<Object>>} Массив созданных записей (обычно одна запись).
 */
export const createRequest = async (bot, prompt) => {
  try {
    const client = clients[bot]

    if (!client) {
      throw new NotFoundError(`Неизвестный бот-клиент: ${bot}`)
    }

    // 1. Отправляем запрос к API
    logger.info("Отправка запроса к API", {
      bot,
      prompt
    })

    const response = await client.send(prompt)

    if (!(response instanceof PromptResponse)) {
      throw new ApiError("Ответ от API не является экземпляром класса PromptResponse")
    }

    // 2. Сохраняем запрос в БД
    logger.info("Создание нового запроса в БД")

    const data = await db.insert(requests).values(response).returning()

    logger.info("Запрос успешно сохранен в БД", {
      requestId: data.id
    })

    return data
  } catch (error) {
    logger.error("Ошибка при создании нового запроса к AI-боту", {
      error: error.message
    })

    throw error
  }
}

/**
 * Получает запрос по его идентификатору
 * @memberof Request.Service
 * @param {string|number} requestId - Идентификатор запроса.
 * @returns {Promise<Array<Object>>} Массив с найденной записью или пустой массив, если запись не найдена.
 */
export const getRequestById = async (requestId) => {
  try {
    logger.info("Получение запроса по ID", {
      requestId
    })

    const items = await db.select().from(requests).where(eq(requests.id, requestId))
    const item = items[0] || null

    if (!item) {
      throw new NotFoundError(`Запрос с ID #${requestId} не найден`)
    }

    logger.info("Запрос по ID успешно найден", {
      requestId
    })

    return item
  } catch (error) {
    logger.error("Ошибка при получении запроса по ID", {
      error: error.message,
      requestId
    })

    throw error
  }
}
