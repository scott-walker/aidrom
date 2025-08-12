/**
 * Сервис для работы с запросами к AI
 * @namespace Request.Service
 */

import { eq } from "drizzle-orm"
import { db } from "#db/index.js"
import { requests } from "#db/schema/requests.js"
import { sendPrompt } from "#clients/genApiClient.js"
import { createServiceLogger } from "#utils/logger.js"

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
 * Создает новый запрос в базе данных
 * @memberof Request.Service
 * @param {String} bot - бот-обработчик запроса
 * @param {String} prompt - Текст запроса к AI
 * @returns {Promise<Array<Object>>} Массив созданных записей (обычно одна запись).
 */
export const createRequest = async (bot, prompt) => {
  logger.info("Создание нового запроса в БД", {
    bot,
    prompt
  })

  // Отправляем запрос к AI
  const response = await sendPrompt(bot, prompt)

  // Формируем данные для сохранения в БД
  const data = {
    model: response.model,
    prompt,
    content: response.result[0],
    request: response.parameters,
    response: {
      requestId: response.id,
      cost: response.cost
    }
  }

  // Сохраняем запрос в БД
  const request = await db.insert(requests).values(data).returning()

  logger.info("Запрос успешно сохранен в БД", {
    requestId: request[0].id,
    model: request[0].model
  })

  return request
}

/**
 * Получает запрос по его идентификатору
 * @memberof Request.Service
 * @param {string|number} requestId - Идентификатор запроса.
 * @returns {Promise<Array<Object>>} Массив с найденной записью или пустой массив, если запись не найдена.
 */
export const getRequestById = async (requestId) => {
  logger.info("Выполнение запроса: получение запроса по ID", {
    requestId
  })

  const items = await db.select().from(requests).where(eq(requests.id, requestId))
  const item = items[0] || null

  if (!item) {
    logger.warn("Запрос с указанным ID не найден", {
      requestId
    })

    throw new Error(`Запрос с ID #${requestId} не найден`)
  }

  logger.info("Запрос по ID успешно найден", {
    requestId
  })

  return item
}
