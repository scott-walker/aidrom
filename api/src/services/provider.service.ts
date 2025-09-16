/**
 * Сервис для работы с провайдерами
 * @namespace Provider.Service
 */

import { eq, desc } from "drizzle-orm"
import {
  db,
  providers,
  Provider,
  CreateProviderData,
  UpdateProviderData,
  ProviderWithDriver,
  AgentParams,
  ChatContext,
  AgentRule,
  CommunicationRoles
} from "@db"
import { createServiceLogger } from "@utils/logger"
import { NotFoundError } from "@utils/errors"
import {
  initDriver,
  DriverConfig,
  DriverResponse,
  Driver,
  DriverRequestParamsConfig,
  DriverRequestMessages,
  DriverRequestMessageRole,
  DriverRequestParams,
  DriverRequestMessage
} from "@drivers"

/**
 * Параметры обработки запроса к провайдеру
 * @namespace Provider.Service.ProcessRequestParams
 */
interface ProcessRequestParams {
  providerId: number
  agentRules: AgentRule[]
  agentParams: AgentParams
  chatContext: ChatContext
  clientMessage: string
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

    let driverParamsConfig = {} as DriverRequestParamsConfig
    const providerItem = await db.query.providers.findFirst({
      where: eq(providers.id, providerId)
    })

    if (!providerItem) {
      throw new NotFoundError(`Провайдер с ID #${providerId} не найден`)
    }

    try {
      const driver = initDriver(providerItem.driver, providerItem.config as DriverConfig) as Driver
      driverParamsConfig = await driver.getParamsConfig()
    } catch (error) {
      logger.error("Ошибка при инициализации драйвера", { error: error.message, providerId })
    }

    logger.info("Провайдер по ID успешно найден", { providerId })

    return { ...providerItem, driverParamsConfig }
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
export const processRequest = async ({
  providerId,
  agentRules,
  agentParams,
  chatContext,
  clientMessage
}: ProcessRequestParams): Promise<DriverResponse> => {
  try {
    logger.info("Обработка запроса к провайдеру", { providerId })

    const provider = await getProviderById(providerId)
    const messages = compileMessages(agentRules, chatContext, clientMessage)
    const params = normalizeParams(agentParams)
    const driver = initDriver(provider.driver, provider.config as DriverConfig)
    const response = await driver.sendRequest({ messages, params })

    return response
  } catch (error) {
    logger.error("Ошибка при обработке запроса к провайдеру", { error: error.message, providerId })

    throw error
  }
}

/**
 * Компилирует системные сообщения агента, контекст чата и сообщение клиента
 * @namespace Agent.Service.compileMessages
 */
export const compileMessages = (
  agentRules: AgentRule[],
  chatContext: ChatContext,
  clientMessageContent: string
): DriverRequestMessages => {
  const mapRoles = {
    [CommunicationRoles.System]: DriverRequestMessageRole.SYSTEM,
    [CommunicationRoles.Client]: DriverRequestMessageRole.USER,
    [CommunicationRoles.Agent]: DriverRequestMessageRole.ASSISTANT
  }

  // Системные сообщения (на основе правил агента)
  const systemMessage = agentRules.reverse().reduce(
    (message, rule) => {
      message.content += `- ${rule.content}\n`

      return message
    },
    { role: DriverRequestMessageRole.SYSTEM, content: "" } as DriverRequestMessage
  )

  // Сообщения чата (контекст общения)
  const chatMessages = chatContext.map(item => ({
    role: mapRoles[item.role],
    content: item.content
  }))

  // Сообщение клиента
  const clientMessage = {
    role: mapRoles[CommunicationRoles.Client],
    content: clientMessageContent
  }

  return [systemMessage, ...chatMessages, clientMessage]
}

/**
 * Нормализует параметры агента
 * @namespace Provider.Service.normalizeParams
 */
const normalizeParams = (agentParams: AgentParams): DriverRequestParams => {
  return {
    model: agentParams.model,
    maxTokens: agentParams.maxTokens,
    topP: agentParams.topP,
    temperature: agentParams.temperature,
    frequencyPenalty: agentParams.frequencyPenalty,
    presencePenalty: agentParams.presencePenalty
  }
}
