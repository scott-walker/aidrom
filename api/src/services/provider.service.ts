/**
 * Сервис для работы с провайдерами
 * @namespace Provider.Service
 */

import { eq, desc } from "drizzle-orm"
import { db, providers, Provider, CreateProviderData, UpdateProviderData } from "@db"
import { createServiceLogger } from "@utils/logger"
import { NotFoundError } from "@utils/errors"
import { initDriver, DriverConfig, DriverRequest, DriverResponse } from "@drivers"

// Создаем логгер для сервиса провайдеров
const logger = createServiceLogger("ProviderService")

/**
 * Получить всех провайдеров из базы данных
 * @namespace Provider.Service.getProviders
 */
export const getProviders = async (): Promise<Provider[]> => {
  try {
    logger.info("Получение всех провайдеров из БД")

    const items = await db.query.providers.findMany({
      orderBy: [desc(providers.createdAt)]
    })

    logger.info("Запрос к БД выполнен успешно", { count: items.length })

    return items
  } catch (error) {
    logger.error("Ошибка при получении всех провайдеров из БД", { error: error.message })

    throw error
  }
}

/**
 * Получить провайдера по его идентификатору
 * @namespace Provider.Service.getProviderById
 */
export const getProviderById = async (providerId: number): Promise<Provider> => {
  try {
    logger.info("Получение провайдера по ID", { providerId })

    const providerItem = await db.query.providers.findFirst({
      where: eq(providers.id, providerId)
    })

    if (!providerItem) {
      throw new NotFoundError(`Провайдер с ID #${providerId} не найден`)
    }

    logger.info("Провайдер по ID успешно найден", { providerId })

    return providerItem
  } catch (error) {
    logger.error("Ошибка при получении провайдера по ID", { error: error.message, providerId })

    throw error
  }
}

/**
 * Создать нового провайдера
 * @namespace Provider.Service.createProvider
 */
export const createProvider = async (data: CreateProviderData): Promise<Provider> => {
  try {
    logger.info("Создание нового провайдера в БД", data)

    const [providerItem] = await db.insert(providers).values(data).returning()

    logger.info("Провайдер успешно создан", { providerId: providerItem.id })

    return providerItem
  } catch (error) {
    logger.error("Ошибка при создании провайдера", { error: error.message, data })

    throw error
  }
}

/**
 * Обновить данные провайдера
 * @namespace Provider.Service.updateProvider
 */
export const updateProvider = async (providerId: number, data: UpdateProviderData): Promise<Provider> => {
  try {
    logger.info("Обновление провайдера в БД", { providerId, data })

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

    logger.info("Провайдер успешно обновлен", { providerId })

    return providerItem
  } catch (error) {
    logger.error("Ошибка при обновлении провайдера", { error: error.message, providerId, data })

    throw error
  }
}

/**
 * Удалить провайдера
 * @namespace Provider.Service.deleteProvider
 */
export const deleteProvider = async (providerId: number): Promise<Provider> => {
  try {
    logger.info("Удаление провайдера из БД", { providerId })

    const [providerItem] = await db.delete(providers).where(eq(providers.id, providerId)).returning()

    if (!providerItem) {
      throw new NotFoundError(`Провайдер с ID #${providerId} не найден`)
    }

    logger.info("Провайдер успешно удален", { providerId })

    return providerItem
  } catch (error) {
    logger.error("Ошибка при удалении провайдера", { error: error.message, providerId })

    throw error
  }
}

/**
 * Обработка запроса к провайдеру
 * @namespace Provider.Service.processRequest
 */
export const processRequest = async (providerId: number, request: DriverRequest): Promise<DriverResponse> => {
  try {
    logger.info("Обработка запроса к провайдеру", { providerId, request })

    const provider = await getProviderById(providerId)
    const driver = initDriver(provider.driver, provider.config as DriverConfig)
    const response = await driver.sendRequest(request)

    return response
  } catch (error) {
    logger.error("Ошибка при обработке запроса к провайдеру", { error: error.message, providerId, request })

    throw error
  }
}
