/**
 * Сервис для работы с провайдерами
 * @namespace Provider.Service
 */

import { eq, desc } from "drizzle-orm"
import { db } from "#db/index.js"
import { providers } from "#db/schema/providers.js"
import { createServiceLogger } from "#utils/logger.js"
import { NotFoundError } from "#utils/errors.js"

// Создаем логгер для сервиса провайдеров
const logger = createServiceLogger("ProviderService")

/**
 * Получить всех провайдеров из базы данных
 * @memberof Provider.Service
 * @returns {Promise<Array<Object>>} Массив объектов с информацией о провайдерах.
 */
export const getProviders = async () => {
  try {
    logger.info("Получение всех провайдеров из БД")

    const items = await db.query.providers.findMany({
      orderBy: [desc(providers.createdAt)]
    })

    logger.info("Запрос к БД выполнен успешно", {
      count: items.length
    })

    return items
  } catch (error) {
    logger.error("Ошибка при получении всех провайдеров из БД", {
      error: error.message
    })

    throw error
  }
}

/**
 * Получить провайдера по его идентификатору
 * @memberof Provider.Service
 * @param {string|number} providerId - Идентификатор провайдера.
 * @returns {Promise<Object>} Объект с информацией о провайдере.
 */
export const getProviderById = async providerId => {
  try {
    logger.info("Получение провайдера по ID", {
      providerId
    })

    const providerItem = await db.query.providers.findFirst({
      where: eq(providers.id, providerId)
    })

    if (!providerItem) {
      throw new NotFoundError(`Провайдер с ID #${providerId} не найден`)
    }

    logger.info("Провайдер по ID успешно найден", {
      providerId
    })

    return providerItem
  } catch (error) {
    logger.error("Ошибка при получении провайдера по ID", {
      error: error.message,
      providerId
    })

    throw error
  }
}

/**
 * Получить провайдера по алиасу
 * @memberof Provider.Service
 * @param {string} alias - Алиас провайдера.
 * @returns {Promise<Object>} Объект с информацией о провайдере.
 */
export const getProviderByAlias = async alias => {
  try {
    logger.info("Получение провайдера по алиасу", {
      alias
    })

    const providerItem = await db.query.providers.findFirst({
      where: eq(providers.alias, alias)
    })

    if (!providerItem) {
      throw new NotFoundError(`Провайдер с алиасом ${alias} не найден`)
    }

    logger.info("Провайдер по алиасу успешно найден", {
      alias
    })

    return providerItem
  } catch (error) {
    logger.error("Ошибка при получении провайдера по алиасу", {
      error: error.message,
      alias
    })

    throw error
  }
}

/**
 * Создать нового провайдера
 * @memberof Provider.Service
 * @param {Object} data - Данные для создания провайдера
 * @param {string} data.alias - Алиас провайдера
 * @param {string} data.name - Название провайдера
 * @param {string} data.baseUrl - Базовый URL API провайдера
 * @param {string} data.apiKey - API ключ провайдера
 * @returns {Promise<Object>} Созданный провайдер
 */
export const createProvider = async data => {
  try {
    logger.info("Создание нового провайдера в БД", data)

    const [providerItem] = await db.insert(providers).values(data).returning()

    logger.info("Провайдер успешно создан", {
      providerId: providerItem.id
    })

    return providerItem
  } catch (error) {
    logger.error("Ошибка при создании провайдера", {
      error: error.message,
      data
    })

    throw error
  }
}

/**
 * Обновить данные провайдера
 * @memberof Provider.Service
 * @param {string|number} providerId - Идентификатор провайдера
 * @param {Object} data - Данные для обновления
 * @param {string} [data.alias] - Алиас провайдера
 * @param {string} [data.name] - Название провайдера
 * @param {string} [data.baseUrl] - Базовый URL API провайдера
 * @param {string} [data.apiKey] - API ключ провайдера
 * @returns {Promise<Object>} Обновленный провайдер
 */
export const updateProvider = async (providerId, data) => {
  try {
    logger.info("Обновление провайдера в БД", {
      providerId,
      data
    })

    const [providerItem] = await db
      .update(providers)
      .set({
        ...data,
        updatedAt: new Date()
      })
      .where(eq(providers.id, providerId))
      .returning()

    if (!providerItem) {
      throw new NotFoundError(`Провайдер с ID #${providerId} не найден`)
    }

    logger.info("Провайдер успешно обновлен", {
      providerId
    })

    return providerItem
  } catch (error) {
    logger.error("Ошибка при обновлении провайдера", {
      error: error.message,
      providerId,
      data
    })

    throw error
  }
}

/**
 * Удалить провайдера
 * @memberof Provider.Service
 * @param {string|number} providerId - Идентификатор провайдера
 * @returns {Promise<Object>} Удаленный провайдер
 */
export const deleteProvider = async providerId => {
  try {
    logger.info("Удаление провайдера из БД", {
      providerId
    })

    const [providerItem] = await db.delete(providers).where(eq(providers.id, providerId)).returning()

    if (!providerItem) {
      throw new NotFoundError(`Провайдер с ID #${providerId} не найден`)
    }

    logger.info("Провайдер успешно удален", {
      providerId
    })

    return providerItem
  } catch (error) {
    logger.error("Ошибка при удалении провайдера", {
      error: error.message,
      providerId
    })

    throw error
  }
}
