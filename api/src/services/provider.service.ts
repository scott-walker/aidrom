/**
 * Сервис для работы с провайдерами
 * @namespace Provider.Service
 */

import { eq, desc } from "drizzle-orm"
import { db, providers, Provider, CreateProviderData, UpdateProviderData, ProviderWithDriver } from "@db"
import { createServiceLogger } from "@utils/logger"
import { NotFoundError } from "@utils/errors"
import {
  driverFactories,
  initDriver,
  Driver,
  DriverInfo,
  DriverParamsConfig,
  DriverStatus,
  DriverRequest
} from "@drivers"
import { ISender, SenderEvents } from "@utils/sender"
import * as requestService from "./request.service"

/**
 * Параметры обработки запроса к провайдеру
 * @namespace Provider.Service.ProcessRequestParams
 */
interface ProviderProcessResponse {
  requestId: number
  content: string
}

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
export const getProviderById = async (providerId: number): Promise<ProviderWithDriver> => {
  try {
    logger.info("Получение провайдера по ID", { providerId })

    let driverInstance = {} as Driver
    let driverInfo = {} as DriverInfo
    let driverParamsConfig = {} as DriverParamsConfig
    let driverStatus = DriverStatus.OK

    const providerItem = await db.query.providers.findFirst({
      where: eq(providers.id, providerId)
    })

    if (!providerItem) {
      throw new NotFoundError(`Провайдер с ID #${providerId} не найден`)
    }

    try {
      driverInstance = initDriver(providerItem.driver, providerItem.config)
      driverInfo = await driverInstance.getInfo()
      driverParamsConfig = await driverInstance.getParamsConfig()
    } catch (error) {
      driverStatus = DriverStatus.ERROR
      driverInfo = {
        message: "Ошибка при инициализации драйвера"
      }
      driverParamsConfig = {
        meta: { message: "Ошибка при инициализации драйвера" },
        params: []
      }
      logger.error("Ошибка при инициализации драйвера", { error: error.message, providerId })
    }

    logger.info("Провайдер по ID успешно найден", { providerId })

    return {
      ...providerItem,
      driverInstance,
      driverInfo,
      driverParamsConfig,
      driverStatus
    }
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
      .set({ ...data, updatedAt: new Date() })
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
 * Получить список драйверов
 * @namespace Provider.Service.getDrivers
 */
export const getDrivers = async (): Promise<string[]> => {
  return Object.keys(driverFactories)
}

/**
 * Обработка запроса к провайдеру
 * @namespace Provider.Service.processRequest
 */
export const processRequest = async (providerId: number, request: DriverRequest): Promise<ISender> => {
  try {
    logger.info("Обработка запроса к провайдеру", { providerId })

    const { driverInstance } = await getProviderById(providerId)
    const sender = driverInstance.sendRequest(request)

    // Обработать событие завершения отправки сообщения к провайдеру
    sender.on(SenderEvents.DRIVER_SEND_COMPLETE, async response => {
      logger.info("Сохранение информации о запросе/ответе в БД", { action: "onComplete", providerId })

      // Сохранить информацию о запросе/ответе в БД
      const requestData = await requestService.createRequest({
        providerId,
        providerRequestId: response.providerRequestId,
        requestParams: response.requestParams,
        responseData: response.responseData,
        requestTokens: response.requestTokens,
        responseTokens: response.responseTokens
      })

      logger.info("Запрос успешно обработан", {
        action: "onComplete",
        providerId,
        requestId: requestData.id
      })

      // Эммитеть о том, что запросу обработан провайдером
      sender.emit(SenderEvents.PROVIDER_SEND_COMPLETE, {
        requestId: requestData.id,
        responseContent: response.content
      })
    })

    return sender
  } catch (error) {
    logger.error("Ошибка при обработке запроса к провайдеру", { providerId, error: error.message })

    throw error
  }
}
