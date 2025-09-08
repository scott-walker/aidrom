/**
 * Сервис для работы с агентами
 * @namespace Agent.Service
 */

import { eq, desc } from "drizzle-orm"
import { db, agents, Agent, CreateAgentData, UpdateAgentData, CreateRequestData, RequestWithResponseContent } from "@db"
import { DriverResponse } from "@drivers"
import { createServiceLogger } from "@utils/logger"
import { NotFoundError } from "@utils/errors"
import { processRequest } from "./provider.service"
import { createRequest } from "./request.service"

// Создаем логгер для сервиса агентов
const logger = createServiceLogger("AgentService")

/**
 * Получить всех агентов из базы данных
 * @namespace Agent.Service.getAgents
 */
export const getAgents = async (): Promise<Agent[]> => {
  try {
    logger.info("Получение всех агентов из БД")

    const items = await db.query.agents.findMany({
      orderBy: [desc(agents.createdAt)],
      with: {
        provider: true
      }
    })

    logger.info("Запрос к БД выполнен успешно", { count: items.length })

    return items
  } catch (error) {
    logger.error("Ошибка при получении всех агентов из БД", {
      error: error.message
    })

    throw error
  }
}

/**
 * Получить агента по его идентификатору
 * @namespace Agent.Service.getAgentById
 */
export const getAgentById = async (agentId: number): Promise<Agent> => {
  try {
    logger.info("Получение агента по ID", { agentId })

    const agent = await db.query.agents.findFirst({
      where: eq(agents.id, agentId),
      with: {
        provider: true
      }
    })

    if (!agent) {
      throw new NotFoundError(`Агент с ID #${agentId} не найден`)
    }

    logger.info("Агент по ID успешно найден", { agentId })

    return agent
  } catch (error) {
    logger.error("Ошибка при получении агента по ID", { error: error.message, agentId })

    throw error
  }
}

/**
 * Создать нового агента
 * @namespace Agent.Service.createAgent
 */
export const createAgent = async (data: CreateAgentData): Promise<Agent> => {
  try {
    logger.info("Создание нового агента в БД", data)

    const [agent] = await db.insert(agents).values(data).returning()

    logger.info("Агент успешно создан", { agentId: agent.id })

    return agent
  } catch (error) {
    logger.error("Ошибка при создании агента", { error: error.message, data })

    throw error
  }
}

/**
 * Обновить данные агента
 * @namespace Agent.Service.updateAgent
 */
export const updateAgent = async (agentId: number, data: UpdateAgentData): Promise<Agent> => {
  try {
    logger.info("Обновление агента в БД", { agentId, data })

    const [agent] = await db
      .update(agents)
      .set({
        ...data,
        updatedAt: new Date()
      })
      .where(eq(agents.id, agentId))
      .returning()

    if (!agent) {
      throw new NotFoundError(`Агент с ID #${agentId} не найден`)
    }

    logger.info("Агент успешно обновлен", { agentId })

    return agent
  } catch (error) {
    logger.error("Ошибка при обновлении агента", { error: error.message, agentId, data })

    throw error
  }
}

/**
 * Удалить агента
 * @namespace Agent.Service.deleteAgent
 */
export const deleteAgent = async (agentId: number): Promise<Agent> => {
  try {
    logger.info("Удаление агента из БД", { agentId })

    const [agent] = await db.delete(agents).where(eq(agents.id, agentId)).returning()

    if (!agent) {
      throw new NotFoundError(`Агент с ID #${agentId} не найден`)
    }

    logger.info("Агент успешно удален", { agentId })

    return agent
  } catch (error) {
    logger.error("Ошибка при удалении агента", { error: error.message, agentId })

    throw error
  }
}

/**
 * Отправить запрос к AI агенту
 * @namespace Agent.Service.sendRequest
 */
export const sendRequest = async (agentId: number, message: string): Promise<RequestWithResponseContent> => {
  try {
    logger.info("Отправка запроса к AI агенту", { agentId, message })

    const agent = await getAgentById(agentId)

    // Отправляем запрос к API
    const response: DriverResponse = await processRequest(agent.providerId, {
      message,
      params: agent.params
    })

    logger.info("Запрос к API успешно отправлен", { agentId })
    logger.info("Сохранение нового запроса в БД")

    // Сохраняем запрос в БД
    const request = await createRequest({
      providerId: agent.providerId,
      providerRequestId: response.providerRequestId,
      requestParams: response.requestParams,
      responseData: response.responseData,
      requestTokens: response.requestTokens,
      responseTokens: response.responseTokens
    })

    logger.info("Запрос успешно сохранен в БД", { requestId: request.id })

    return { ...request, responseContent: response.content }
  } catch (error) {
    logger.error("Ошибка при создании нового запроса к AI агенту", { error: error.message })

    throw error
  }
}
