/**
 * Контроллер для работы с агентами
 * @namespace Agent.Controller
 */

import { createControllerLogger } from "#utils/logger.js"
import * as agentService from "#services/agent.service.js"

// Создаем логгер для контроллера агентов
const logger = createControllerLogger("AgentController")

/**
 * Получает список всех агентов
 * @memberof Agent.Controller
 * @param {Object} req - Объект запроса Express
 * @param {Object} res - Объект ответа Express
 * @param {Function} next
 * @returns {void}
 */
export const getAgents = async (req, res, next) => {
  try {
    logger.info("Получение списка всех агентов")

    const agents = await agentService.getAgents()

    logger.info("Список агентов успешно получен", {
      count: agents.length
    })

    res.json(agents)
  } catch (err) {
    logger.error("Ошибка при получении списка агентов", {
      error: err.message
    })

    next(err)
  }
}

/**
 * Получает агента по ID
 * @memberof Agent.Controller
 * @param {Object} req - Объект запроса Express
 * @param {Object} res - Объект ответа Express
 * @param {Function} next
 * @returns {void}
 */
export const getAgent = async (req, res, next) => {
  const agentId = req.params.agentId

  try {
    logger.info("Получение агента по ID", {
      agentId
    })

    const agent = await agentService.getAgentById(agentId)

    logger.info("Агент успешно получен", {
      agentId
    })

    res.json(agent)
  } catch (err) {
    logger.error("Ошибка при получении агента", {
      error: err.message,
      agentId
    })

    next(err)
  }
}

/**
 * Получает агента по алиасу
 * @memberof Agent.Controller
 * @param {Object} req - Объект запроса Express
 * @param {Object} res - Объект ответа Express
 * @param {Function} next
 * @returns {void}
 */
export const getAgentByAlias = async (req, res, next) => {
  const alias = req.params.alias

  try {
    logger.info("Получение агента по алиасу", {
      alias
    })

    const agent = await agentService.getAgentByAlias(alias)

    logger.info("Агент по алиасу успешно получен", {
      alias
    })

    res.json(agent)
  } catch (err) {
    logger.error("Ошибка при получении агента по алиасу", {
      error: err.message,
      alias
    })

    next(err)
  }
}

/**
 * Создает нового агента
 * @memberof Agent.Controller
 * @param {Object} req - Объект запроса Express
 * @param {string} req.body.alias - Алиас агента
 * @param {string} req.body.name - Название агента
 * @param {string} [req.body.description] - Описание агента
 * @param {Object} [req.body.params] - Параметры агента (JSON)
 * @param {Object} res - Объект ответа Express
 * @param {Function} next
 * @returns {void}
 */
export const createAgent = async (req, res, next) => {
  try {
    logger.info("Создание нового агента", req.body)

    const agent = await agentService.createAgent(req.body)

    logger.info("Агент успешно создан", {
      agentId: agent.id
    })

    res.status(201).json(agent)
  } catch (err) {
    logger.error("Ошибка при создании агента", {
      error: err.message
    })

    next(err)
  }
}

/**
 * Обновляет данные агента
 * @memberof Agent.Controller
 * @param {Object} req - Объект запроса Express
 * @param {string|number} req.params.agentId - ID агента
 * @param {Object} req.body - Данные для обновления
 * @param {string} [req.body.alias] - Алиас агента
 * @param {string} [req.body.name] - Название агента
 * @param {string} [req.body.description] - Описание агента
 * @param {Object} [req.body.params] - Параметры агента (JSON)
 * @param {Object} res - Объект ответа Express
 * @param {Function} next
 * @returns {void}
 */
export const updateAgent = async (req, res, next) => {
  const agentId = req.params.agentId

  try {
    logger.info("Обновление агента", {
      agentId,
      data: req.body
    })

    const agent = await agentService.updateAgent(agentId, req.body)

    logger.info("Агент успешно обновлен", {
      agentId
    })

    res.json(agent)
  } catch (err) {
    logger.error("Ошибка при обновлении агента", {
      error: err.message,
      agentId
    })

    next(err)
  }
}

/**
 * Удаляет агента
 * @memberof Agent.Controller
 * @param {Object} req - Объект запроса Express
 * @param {string|number} req.params.agentId - ID агента
 * @param {Object} res - Объект ответа Express
 * @param {Function} next
 * @returns {void}
 */
export const deleteAgent = async (req, res, next) => {
  const agentId = req.params.agentId

  try {
    logger.info("Удаление агента", {
      agentId
    })

    const agent = await agentService.deleteAgent(agentId)

    logger.info("Агент успешно удален", {
      agentId
    })

    res.json(agent)
  } catch (err) {
    logger.error("Ошибка при удалении агента", {
      error: err.message,
      agentId
    })

    next(err)
  }
}

/**
 * Получает агентов по фильтрам
 * @memberof Agent.Controller
 * @param {Object} req - Объект запроса Express
 * @param {Object} req.query - Параметры запроса для фильтрации
 * @param {string} [req.query.name] - Фильтр по названию
 * @param {string} [req.query.alias] - Фильтр по алиасу
 * @param {Object} res - Объект ответа Express
 * @param {Function} next
 * @returns {void}
 */
export const getAgentsByFilters = async (req, res, next) => {
  try {
    logger.info("Поиск агентов по фильтрам", req.query)

    const agents = await agentService.getAgentsByFilters(req.query)

    logger.info("Поиск агентов по фильтрам выполнен успешно", {
      filters: req.query,
      count: agents.length
    })

    res.json(agents)
  } catch (err) {
    logger.error("Ошибка при поиске агентов по фильтрам", {
      error: err.message,
      filters: req.query
    })

    next(err)
  }
}
