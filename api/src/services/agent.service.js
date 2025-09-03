/**
 * Сервис для работы с агентами
 * @namespace Agent.Service
 */

import { eq, desc } from "drizzle-orm"
import { db } from "#db/index.js"
import { agents } from "#db/schema/agents.js"
import { requests } from "#db/schema/requests.js"
import { createServiceLogger } from "#utils/logger.js"
import { NotFoundError, ApiError } from "#utils/errors.js"
import { AgentInteraction } from "#utils/api/index.js"
import agentHandlers from "#agents/index.js"

// Создаем логгер для сервиса агентов
const logger = createServiceLogger("AgentService")

/**
 * Получить обработчик агента по алиасу
 * @memberof Agent.Service
 * @param {string} agentAlias - Алиас агента.
 * @returns {Promise<Object>} Объект с информацией об агенте.
 */
export const getAgentHandler = agentAlias => {
  const handler = agentHandlers[agentAlias]

  if (!handler) {
    throw new NotFoundError(`Агент с алиасом ${agentAlias} не найден`)
  }

  return handler
}

/**
 * Получить всех агентов из базы данных
 * @memberof Agent.Service
 * @returns {Promise<Array<Object>>} Массив объектов с информацией об агентах.
 */
export const getAgents = async () => {
  try {
    logger.info("Получение всех агентов из БД")

    const items = await db.query.agents.findMany({
      orderBy: [desc(agents.createdAt)]
    })

    logger.info("Запрос к БД выполнен успешно", {
      count: items.length
    })

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
 * @memberof Agent.Service
 * @param {string|number} agentId - Идентификатор агента.
 * @param {boolean} [withHandler=false] - Получить ли обработчик агента.
 * @returns {Promise<Object>} Объект с информацией об агенте.
 */
export const getAgentById = async (agentId, withHandler = false) => {
  try {
    logger.info("Получение агента по ID", {
      agentId
    })

    const agent = await db.query.agents.findFirst({
      where: eq(agents.id, agentId)
    })

    if (!agent) {
      throw new NotFoundError(`Агент с ID #${agentId} не найден`)
    }

    // Если требуется получить обработчик агента, добавляем его в объект
    if (withHandler) {
      agent.handler = getAgentHandler(alias)
    }

    logger.info("Агент по ID успешно найден", {
      agentId
    })

    return agent
  } catch (error) {
    logger.error("Ошибка при получении агента по ID", {
      error: error.message,
      agentId
    })

    throw error
  }
}

/**
 * Получить агента по алиасу
 * @memberof Agent.Service
 * @param {string} alias - Алиас агента.
 * @param {boolean} [withHandler=false] - Получить ли обработчик агента.
 * @returns {Promise<Object>} Объект с информацией об агенте.
 */
export const getAgentByAlias = async (alias, withHandler = false) => {
  try {
    logger.info("Получение агента по алиасу", {
      alias
    })

    const agent = await db.query.agents.findFirst({
      where: eq(agents.alias, alias)
    })

    if (!agent) {
      throw new NotFoundError(`Агент с алиасом ${alias} не найден`)
    }

    // Если требуется получить обработчик агента, добавляем его в объект
    if (withHandler) {
      agent.handler = getAgentHandler(alias)
    }

    logger.info("Агент по алиасу успешно найден", {
      alias
    })

    return agent
  } catch (error) {
    logger.error("Ошибка при получении агента по алиасу", {
      error: error.message,
      alias
    })

    throw error
  }
}

/**
 * Создать нового агента
 * @memberof Agent.Service
 * @param {Object} data - Данные для создания агента
 * @param {string} data.alias - Алиас агента
 * @param {string} data.name - Название агента
 * @param {string} [data.description] - Описание агента
 * @param {Object} [data.params] - Параметры агента (JSON)
 * @returns {Promise<Object>} Созданный агент
 */
export const createAgent = async data => {
  try {
    logger.info("Создание нового агента в БД", data)

    const [agent] = await db.insert(agents).values(data).returning()

    logger.info("Агент успешно создан", {
      agentId: agent.id
    })

    return agent
  } catch (error) {
    logger.error("Ошибка при создании агента", {
      error: error.message,
      data
    })

    throw error
  }
}

/**
 * Обновить данные агента
 * @memberof Agent.Service
 * @param {string|number} agentId - Идентификатор агента
 * @param {Object} data - Данные для обновления
 * @param {string} [data.alias] - Алиас агента
 * @param {string} [data.name] - Название агента
 * @param {string} [data.description] - Описание агента
 * @param {Object} [data.params] - Параметры агента (JSON)
 * @returns {Promise<Object>} Обновленный агент
 */
export const updateAgent = async (agentId, data) => {
  try {
    logger.info("Обновление агента в БД", {
      agentId,
      data
    })

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

    logger.info("Агент успешно обновлен", {
      agentId
    })

    return agent
  } catch (error) {
    logger.error("Ошибка при обновлении агента", {
      error: error.message,
      agentId,
      data
    })

    throw error
  }
}

/**
 * Удалить агента
 * @memberof Agent.Service
 * @param {string|number} agentId - Идентификатор агента
 * @returns {Promise<Object>} Удаленный агент
 */
export const deleteAgent = async agentId => {
  try {
    logger.info("Удаление агента из БД", {
      agentId
    })

    const [agent] = await db.delete(agents).where(eq(agents.id, agentId)).returning()

    if (!agent) {
      throw new NotFoundError(`Агент с ID #${agentId} не найден`)
    }

    logger.info("Агент успешно удален", {
      agentId
    })

    return agent
  } catch (error) {
    logger.error("Ошибка при удалении агента", {
      error: error.message,
      agentId
    })

    throw error
  }
}

/**
 * Отправить запрос к AI агенту
 * @memberof Agent.Service
 * @param {string} agentAlias - Алиас агента
 * @param {string} prompt - Текст запроса к AI агенту
 * @returns {Promise<Object>} Объект с информацией о запросе.
 */
export const sendRequest = async (agentAlias, prompt) => {
  try {
    logger.info("Отправка запроса к AI агенту", {
      agentAlias,
      prompt
    })

    // Отправляем запрос к API
    const agentHandler = getAgentHandler(agentAlias)
    const interactionData = await agentHandler.send(prompt)

    if (!(interactionData instanceof AgentInteraction)) {
      throw new ApiError("Ответ от API агента не является экземпляром класса AgentInteraction")
    }

    logger.info("Запрос к API успешно отправлен", {
      agentAlias
    })

    logger.info("Сохранение нового запроса в БД")

    // Сохраняем запрос в БД
    const [request] = await db.insert(requests).values(interactionData).returning()

    logger.info("Запрос успешно сохранен в БД", {
      requestId: request.id
    })

    return request
  } catch (error) {
    logger.error("Ошибка при создании нового запроса к AI агенту", {
      error: error.message
    })

    throw error
  }
}
