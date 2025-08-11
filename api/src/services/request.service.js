/**
 * Сервис для работы с запросами к AI
 * @namespace Request.Service
 */

import { db } from "#db/index.js"
import { requests } from "#db/schema/requests.js"
import { eq } from "drizzle-orm"

/**
 * Получает все запросы из базы данных
 * @memberof Request.Service
 * @returns {Promise<Array<Object>>} Массив объектов с информацией о запросах.
 */
export const getRequests = async () => {
  return await db.select().from(requests)
}

/**
 * Создает новый запрос в базе данных
 * @memberof Request.Service
 * @param {Object} data - Данные для создания запроса.
 * @returns {Promise<Array<Object>>} Массив созданных записей (обычно одна запись).
 */
export const createRequest = async (data) => {
  return await db.insert(requests).values(data).returning()
}

/**
 * Получает запрос по его идентификатору
 * @memberof Request.Service
 * @param {string|number} id - Идентификатор запроса.
 * @returns {Promise<Array<Object>>} Массив с найденной записью или пустой массив, если запись не найдена.
 */
export const getRequestById = async (id) => {
  const items = await db.select().from(requests).where(eq(requests.id, id))
  const item = items[0] || null

  if (!item) {
    throw new Error(`Запрос с ID #${id} не найден`)
  }

  return item
}
