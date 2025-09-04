/**
 * Сервис для работы с клиентами
 * @namespace Client.Service
 */

import { eq, desc, InferInsertModel, InferSelectModel } from "drizzle-orm"
import { db, clients } from "@db"
import { createServiceLogger } from "@utils/logger"
import { NotFoundError } from "@utils/errors"

// Типы для клиента
type Client = InferSelectModel<typeof clients>
type CreateClientData = InferInsertModel<typeof clients>
type UpdateClientData = Partial<CreateClientData>

// Создаем логгер для сервиса клиентов
const logger = createServiceLogger("ClientService")

/**
 * Получить всех клиентов из базы данных
 * @namespace Client.Service.getClients
 */
export const getClients = async (): Promise<Client[]> => {
  try {
    logger.info("Получение всех клиентов из БД")

    const items = await db.query.clients.findMany({
      orderBy: [desc(clients.createdAt)]
    })

    logger.info("Запрос к БД выполнен успешно", { count: items.length })

    return items
  } catch (error) {
    logger.error("Ошибка при получении всех клиентов из БД", { error: error.message })

    throw error
  }
}

/**
 * Получить клиента по его идентификатору
 * @namespace Client.Service.getClientById
 */
export const getClientById = async (clientId: number): Promise<Client> => {
  try {
    logger.info("Получение клиента по ID", { clientId })

    const item = await db.query.clients.findFirst({
      where: eq(clients.id, clientId)
    })

    if (!item) {
      throw new NotFoundError(`Клиент с ID #${clientId} не найден`)
    }

    logger.info("Клиент по ID успешно найден", { clientId })

    return item
  } catch (error) {
    logger.error("Ошибка при получении клиента по ID", { error: error.message, clientId })

    throw error
  }
}

/**
 * Получить клиента по email
 * @namespace Client.Service.getClientByEmail
 */
export const getClientByEmail = async (email: string): Promise<Client> => {
  try {
    logger.info("Получение клиента по email", { email })

    const item = await db.query.clients.findFirst({
      where: eq(clients.email, email)
    })

    if (!item) {
      throw new NotFoundError(`Клиент с email ${email} не найден`)
    }

    logger.info("Клиент по email успешно найден", { email })

    return item
  } catch (error) {
    logger.error("Ошибка при получении клиента по email", { error: error.message, email })

    throw error
  }
}

/**
 * Создать нового клиента
 * @namespace Client.Service.createClient
 */
export const createClient = async (data: CreateClientData): Promise<Client> => {
  try {
    logger.info("Создание нового клиента в БД", data)

    const [client] = await db.insert(clients).values(data).returning()

    logger.info("Клиент успешно создан", { clientId: client.id })

    return client
  } catch (error) {
    logger.error("Ошибка при создании клиента", { error: error.message, data })

    throw error
  }
}

/**
 * Обновить данные клиента
 * @namespace Client.Service.updateClient
 */
export const updateClient = async (clientId: number, data: UpdateClientData): Promise<Client> => {
  try {
    logger.info("Обновление клиента в БД", { clientId, data })

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

    logger.info("Клиент успешно обновлен", { clientId })

    return client
  } catch (error) {
    logger.error("Ошибка при обновлении клиента", { error: error.message, clientId, data })

    throw error
  }
}

/**
 * Удалить клиента
 * @namespace Client.Service.deleteClient
 */
export const deleteClient = async (clientId: number): Promise<Client> => {
  try {
    logger.info("Удаление клиента из БД", { clientId })

    const [client] = await db.delete(clients).where(eq(clients.id, clientId)).returning()

    if (!client) {
      throw new NotFoundError(`Клиент с ID #${clientId} не найден`)
    }

    logger.info("Клиент успешно удален", { clientId })

    return client
  } catch (error) {
    logger.error("Ошибка при удалении клиента", { error: error.message, clientId })

    throw error
  }
}

/**
 * Обновляет баланс клиента
 * @namespace Client.Service.updateClientBalance
 */
export const updateClientBalance = async (clientId: number, balance: number): Promise<Client> => {
  try {
    logger.info("Обновление баланса клиента", { clientId, balance })

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

    logger.info("Баланс клиента успешно обновлен", { clientId, balance })

    return client
  } catch (error) {
    logger.error("Ошибка при обновлении баланса клиента", { error: error.message, clientId, balance })

    throw error
  }
}
