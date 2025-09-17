/**
 * Сервис для работы с агентами
 * @namespace Agent.Service
 */

import { eq, desc, asc, max, and } from "drizzle-orm"
import {
  db,
  agents,
  Agent,
  CreateAgentData,
  UpdateAgentData,
  RequestWithResponseContent,
  CreateAgentRuleData,
  AgentRule,
  agentRules,
  mapAgent,
  ChatContext
} from "@db"
import { DriverResponse } from "@drivers"
import { createServiceLogger } from "@utils/logger"
import { NotFoundError } from "@utils/errors"
import { getProviderById, processRequest } from "./provider.service"
import { createRequest } from "./request.service"

/**
 * Параметры отправки запроса к AI агенту
 * @namespace Agent.Service.SendRequestParams
 */
interface AgentSendRequestParams {
  agentId: number
  clientId: number
  chatСontext: ChatContext
  message: string
}

// Создаем логгер для сервиса агентов
const logger = createServiceLogger("AgentService")

/**
 * Получить всех агентов из базы данных
 * @namespace Agent.Service.getAgents
 */
export const getAgents = async (): Promise<Agent[]> => {
  try {
    logger.info("Получение всех агентов из БД")

    const items = (await db.query.agents.findMany({
      orderBy: [desc(agents.createdAt)],
      with: {
        provider: true,
        rules: {
          orderBy: [asc(agentRules.priority)]
        }
      }
    })) as Agent[]

    logger.info("Запрос к БД выполнен успешно", { count: items.length })

    return items.map(mapAgent)
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

    const agent = (await db.query.agents.findFirst({
      where: eq(agents.id, agentId),
      with: {
        // provider: true,
        rules: {
          orderBy: [asc(agentRules.priority)]
        }
      }
    })) as Agent

    if (!agent) {
      throw new NotFoundError(`Агент с ID #${agentId} не найден`)
    }

    // Получаем провайдера (с конфигурацией параметров)
    agent.provider = await getProviderById(agent.providerId)

    logger.info("Агент по ID успешно найден", { agentId })

    return mapAgent(agent)
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

    return getAgentById(agent.id)
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

    return getAgentById(agent.id)
  } catch (error) {
    logger.error("Ошибка при обновлении агента", { error: error.message, agentId, data })

    throw error
  }
}

/**
 * Удалить агента
 * @namespace Agent.Service.deleteAgent
 */
export const deleteAgent = async (agentId: number): Promise<void> => {
  try {
    logger.info("Удаление агента из БД", { agentId })

    const [agent] = await db.delete(agents).where(eq(agents.id, agentId)).returning()

    if (!agent) {
      throw new NotFoundError(`Агент с ID #${agentId} не найден`)
    }

    logger.info("Агент успешно удален", { agentId })
  } catch (error) {
    logger.error("Ошибка при удалении агента", { error: error.message, agentId })

    throw error
  }
}

/**
 * Отправить запрос к AI агенту
 * @namespace Agent.Service.sendRequest
 */
export const sendRequest = async ({
  agentId,
  clientId,
  chatСontext,
  message
}: AgentSendRequestParams): Promise<RequestWithResponseContent> => {
  try {
    logger.info("Отправка запроса к AI агенту", { agentId, clientId, message })

    const agent = await getAgentById(agentId)

    // Отправляем запрос к API
    const response: DriverResponse = await processRequest({
      providerId: agent.providerId,
      agentRules: agent.rules,
      agentParams: agent.params,
      chatContext: chatСontext,
      clientMessage: message
    })

    logger.info("Запрос к API успешно отправлен", { agentId, clientId })
    logger.info("Сохранение нового запроса в БД")

    // Сохраняем запрос в БД
    const request = await createRequest({
      providerId: agent.providerId,
      agentId: agent.id,
      clientId,
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

/**
 * Добавить правило агенту
 * @namespace Agent.Service.addRule
 */
export const addRule = async (agentId: number, data: CreateAgentRuleData): Promise<AgentRule> => {
  try {
    logger.info("Добавление правила агента в БД", { agentId, data })

    const [{ max: maxPriority }] = await db
      .select({ max: max(agentRules.priority) })
      .from(agentRules)
      .where(eq(agentRules.agentId, agentId))
      .execute()

    logger.info("Максимальный приоритет правил агента", { maxPriority })

    const priority = maxPriority ? maxPriority + 1 : 0

    logger.info("Приоритет правила агента успешно вычислен", { priority })

    const [rule] = await db
      .insert(agentRules)
      .values({ ...data, agentId, priority })
      .returning()

    logger.info("Правило агента успешно добавлено", { agentId })

    return rule
  } catch (error) {
    logger.error("Ошибка при добавлении правила агента в БД", { error: error.message, agentId, data })

    throw error
  }
}

/**
 * Удалить правило агента
 * @namespace Agent.Service.deleteRule
 */
export const deleteRule = async (agentId: number, ruleId: number): Promise<void> => {
  try {
    logger.info("Удаление правила агента в БД", { agentId, ruleId })

    await db
      .delete(agentRules)
      .where(and(eq(agentRules.id, ruleId), eq(agentRules.agentId, agentId)))
      .returning()

    logger.info("Пересчет приоритетов правил агента", { agentId })

    const rules = await db
      .select()
      .from(agentRules)
      .where(eq(agentRules.agentId, agentId))
      .orderBy(asc(agentRules.priority))
      .execute()

    rules.forEach(async (rule, index) => {
      await db.update(agentRules).set({ priority: index }).where(eq(agentRules.id, rule.id))
    })

    logger.info("Правило агента успешно удалено", { agentId, ruleId })
  } catch (error) {
    logger.error("Ошибка при удалении правила агента в БД", { error: error.message, agentId, ruleId })

    throw error
  }
}

/**
 * Сортировать правила агента
 * @namespace Agent.Service.sortRules
 */
export const sortRules = async (agentId: number, ruleIds: number[]): Promise<void> => {
  try {
    logger.info("Сортировка правил агента в БД", { agentId, ruleIds })

    ruleIds.forEach(async (ruleId, index) => {
      await db.update(agentRules).set({ priority: index }).where(eq(agentRules.id, ruleId))
    })

    logger.info("Правила агента успешно отсортированы", { agentId })
  } catch (error) {
    logger.error("Ошибка при сортировке правил агента в БД", { error: error.message, agentId, ruleIds })

    throw error
  }
}
