/**
 * Сервис для работы с клиентами
 * @namespace Client.Service
 */

import { eq, desc } from "drizzle-orm"
import { db } from "#db/index.js"
import { clients } from "#db/schema/clients.js"
import { createServiceLogger } from "#utils/logger.js"
import { NotFoundError } from "#utils/errors.js"

// Создаем логгер для сервиса клиентов
const logger = createServiceLogger("ClientService")

/**
 * Получить всех клиентов из базы данных
 * @memberof Client.Service
 * @returns {Promise<Array<Object>>} Массив объектов с информацией о клиентах.
 */
export const getClients = async () => {
  try {
    logger.info("Получение всех клиентов из БД")

    const items = await db.query.clients.findMany({
      orderBy: [desc(clients.createdAt)]
    })

    logger.info("Запрос к БД выполнен успешно", {
      count: items.length
    })

    return items
  } catch (error) {
    logger.error("Ошибка при получении всех клиентов из БД", {
      error: error.message
    })

    throw error
  }
}

/**
 * Получить клиента по его идентификатору
 * @memberof Client.Service
 * @param {string|number} clientId - Идентификатор клиента.
 * @returns {Promise<Object>} Объект с информацией о клиенте.
 */
export const getClientById = async clientId => {
  try {
    logger.info("Получение клиента по ID", {
      clientId
    })

    const item = await db.query.clients.findFirst({
      where: eq(clients.id, clientId)
    })

    if (!item) {
      throw new NotFoundError(`Клиент с ID #${clientId} не найден`)
    }

    logger.info("Клиент по ID успешно найден", {
      clientId
    })

    return item
  } catch (error) {
    logger.error("Ошибка при получении клиента по ID", {
      error: error.message,
      clientId
    })

    throw error
  }
}

/**
 * Получить клиента по email
 * @memberof Client.Service
 * @param {string} email - Email клиента.
 * @returns {Promise<Object>} Объект с информацией о клиенте.
 */
export const getClientByEmail = async email => {
  try {
    logger.info("Получение клиента по email", {
      email
    })

    const item = await db.query.clients.findFirst({
      where: eq(clients.email, email)
    })

    if (!item) {
      throw new NotFoundError(`Клиент с email ${email} не найден`)
    }

    logger.info("Клиент по email успешно найден", {
      email
    })

    return item
  } catch (error) {
    logger.error("Ошибка при получении клиента по email", {
      error: error.message,
      email
    })

    throw error
  }
}

/**
 * Создать нового клиента
 * @memberof Client.Service
 * @param {Object} data - Данные для создания клиента
 * @param {string} data.email - Email клиента
 * @param {number} [data.balance] - Баланс клиента
 * @returns {Promise<Object>} Созданный клиент
 */
export const createClient = async data => {
  try {
    logger.info("Создание нового клиента в БД", data)

    const [client] = await db.insert(clients).values(data).returning()

    logger.info("Клиент успешно создан", {
      clientId: client.id
    })

    return client
  } catch (error) {
    logger.error("Ошибка при создании клиента", {
      error: error.message,
      data
    })

    throw error
  }
}

/**
 * Обновить данные клиента
 * @memberof Client.Service
 * @param {string|number} clientId - Идентификатор клиента
 * @param {Object} data - Данные для обновления
 * @param {string} [data.email] - Email клиента
 * @param {number} [data.balance] - Баланс клиента
 * @returns {Promise<Object>} Обновленный клиент
 */
export const updateClient = async (clientId, data) => {
  try {
    logger.info("Обновление клиента в БД", {
      clientId,
      data
    })

    const [client] = await db
      .update(clients)
      .set({
        ...data,
        updatedAt: new Date()
      })
      .where(eq(clients.id, clientId))
      .returning()

    if (!client) {
      throw new NotFoundError(`Клиент с ID #${clientId} не найден`)
    }

    logger.info("Клиент успешно обновлен", {
      clientId
    })

    return client
  } catch (error) {
    logger.error("Ошибка при обновлении клиента", {
      error: error.message,
      clientId,
      data
    })

    throw error
  }
}

/**
 * Удалить клиента
 * @memberof Client.Service
 * @param {string|number} clientId - Идентификатор клиента
 * @returns {Promise<Object>} Удаленный клиент
 */
export const deleteClient = async clientId => {
  try {
    logger.info("Удаление клиента из БД", {
      clientId
    })

    const [client] = await db.delete(clients).where(eq(clients.id, clientId)).returning()

    if (!client) {
      throw new NotFoundError(`Клиент с ID #${clientId} не найден`)
    }

    logger.info("Клиент успешно удален", {
      clientId
    })

    return client
  } catch (error) {
    logger.error("Ошибка при удалении клиента", {
      error: error.message,
      clientId
    })

    throw error
  }
}

/**
 * Обновляет баланс клиента
 * @memberof Client.Service
 * @param {string|number} clientId - Идентификатор клиента
 * @param {number} balance - Баланс клиента
 * @returns {Promise<Object>} Обновленный клиент
 */
export const updateClientBalance = async (clientId, balance) => {
  try {
    logger.info("Обновление баланса клиента", {
      clientId,
      balance
    })

    const [client] = await db
      .update(clients)
      .set({
        balance,
        updatedAt: new Date()
      })
      .where(eq(clients.id, clientId))
      .returning()

    if (!client) {
      throw new NotFoundError(`Клиент с ID #${clientId} не найден`)
    }

    logger.info("Баланс клиента успешно обновлен", {
      clientId,
      balance
    })

    return client
  } catch (error) {
    logger.error("Ошибка при обновлении баланса клиента", {
      error: error.message,
      clientId,
      balance
    })

    throw error
  }
}
