/**
 * Контроллер для работы с агентами
 * @namespace Agent.Controller
 */

import { Request, Response, NextFunction } from "express"
import { createControllerLogger } from "@utils/logger"
import * as agentService from "@services/agent.service"

// Создаем логгер для контроллера агентов
const logger = createControllerLogger("AgentController")

/**
 * Получить список всех агентов
 * @namespace Agent.Controller.getAgents
 */
export const getAgents = async (req: Request, res: Response, next: NextFunction) => {
  try {
    logger.info("Получение списка всех агентов")

    const agents = await agentService.getAgents()

    logger.info("Список агентов успешно получен", { count: agents.length })

    res.json(agents)
  } catch (err) {
    logger.error("Ошибка при получении списка агентов", { error: err.message })

    next(err)
  }
}

/**
 * Получить агента по ID
 * @namespace Agent.Controller.getAgent
 */
export const getAgent = async (req: Request, res: Response, next: NextFunction) => {
  const agentId = parseInt(req.params.agentId)

  try {
    logger.info("Получение агента по ID", { agentId })

    const agent = await agentService.getAgentById(agentId)

    logger.info("Агент успешно получен", { agentId })

    res.json(agent)
  } catch (err) {
    logger.error("Ошибка при получении агента", { error: err.message, agentId })

    next(err)
  }
}

/**
 * Создать нового агента
 * @namespace Agent.Controller.createAgent
 */
export const createAgent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    logger.info("Создание нового агента", req.body)

    const agent = await agentService.createAgent(req.body)

    logger.info("Агент успешно создан", { agentId: agent.id })

    res.status(201).json(agent)
  } catch (err) {
    logger.error("Ошибка при создании агента", { error: err.message })

    next(err)
  }
}

/**
 * Обновить данные агента
 * @namespace Agent.Controller.updateAgent
 */
export const updateAgent = async (req: Request, res: Response, next: NextFunction) => {
  const agentId = parseInt(req.params.agentId)

  try {
    logger.info("Обновление агента", { agentId, data: req.body })

    const agent = await agentService.updateAgent(agentId, req.body)

    logger.info("Агент успешно обновлен", { agentId })

    res.json(agent)
  } catch (err) {
    logger.error("Ошибка при обновлении агента", { error: err.message, agentId })

    next(err)
  }
}

/**
 * Удалить агента
 * @namespace Agent.Controller.deleteAgent
 */
export const deleteAgent = async (req: Request, res: Response, next: NextFunction) => {
  const agentId = parseInt(req.params.agentId)

  try {
    logger.info("Удаление агента", { agentId })

    const agent = await agentService.deleteAgent(agentId)

    logger.info("Агент успешно удален", { agentId })

    res.json(agent)
  } catch (err) {
    logger.error("Ошибка при удалении агента", { error: err.message, agentId })

    next(err)
  }
}

/**
 * Добавить правило агента
 * @namespace Agent.Controller.addRule
 */
export const addRule = async (req: Request, res: Response, next: NextFunction) => {
  const agentId = parseInt(req.params.agentId)

  try {
    logger.info("Добавление правила агента", { agentId, data: req.body })

    const rule = await agentService.addRule(agentId, req.body)

    logger.info("Правило агента успешно добавлено", { agentId })

    res.json(rule)
  } catch (err) {
    logger.error("Ошибка при добавлении правила агента", { error: err.message, agentId })

    next(err)
  }
}

/**
 * Удалить правило агента
 * @namespace Agent.Controller.deleteRule
 */
export const deleteRule = async (req: Request, res: Response, next: NextFunction) => {
  const ruleId = parseInt(req.params.ruleId)

  try {
    logger.info("Удаление правила агента", { ruleId })

    const rule = await agentService.deleteRule(ruleId)

    logger.info("Правило агента успешно удалено", { ruleId })

    res.json(rule)
  } catch (err) {
    logger.error("Ошибка при удалении правила агента", { error: err.message, ruleId })

    next(err)
  }
}
