/**
 * Контроллер для работы с клиентами
 * @namespace Client.Controller
 */

import { Request, Response, NextFunction } from "express"
import { createControllerLogger } from "@utils/logger"
import * as clientService from "@services/client.service"

// Создаем логгер для контроллера клиентов
const logger = createControllerLogger("ClientController")

/**
 * Получить список всех клиентов
 * @namespace Client.Controller.getClients
 */
export const getClients = async (req: Request, res: Response, next: NextFunction) => {
  try {
    logger.info("Получение списка всех клиентов")

    const clients = await clientService.getClients()

    logger.info("Список клиентов успешно получен", { count: clients.length })

    res.json(clients)
  } catch (err) {
    logger.error("Ошибка при получении списка клиентов", { error: err.message })

    next(err)
  }
}

/**
 * Получить клиента по ID
 * @namespace Client.Controller.getClient
 */
export const getClient = async (req: Request, res: Response, next: NextFunction) => {
  const clientId = parseInt(req.params.clientId)

  try {
    logger.info("Получение клиента по ID", { clientId })

    const client = await clientService.getClientById(clientId)

    logger.info("Клиент успешно получен", { clientId })

    res.json(client)
  } catch (err) {
    logger.error("Ошибка при получении клиента", { error: err.message, clientId })

    next(err)
  }
}

/**
 * Получить клиента по email
 * @namespace Client.Controller.getClientByEmail
 */
export const getClientByEmail = async (req: Request, res: Response, next: NextFunction) => {
  const email = req.params.email as string

  try {
    logger.info("Получение клиента по email", { email })

    const client = await clientService.getClientByEmail(email)

    logger.info("Клиент по email успешно получен", { email })

    res.json(client)
  } catch (err) {
    logger.error("Ошибка при получении клиента по email", { error: err.message, email })

    next(err)
  }
}

/**
 * Создать нового клиента
 * @namespace Client.Controller.createClient
 */
export const createClient = async (req: Request, res: Response, next: NextFunction) => {
  try {
    logger.info("Создание нового клиента", req.body)

    const client = await clientService.createClient(req.body)

    logger.info("Клиент успешно создан", { clientId: client.id })

    res.status(201).json(client)
  } catch (err) {
    logger.error("Ошибка при создании клиента", { error: err.message })

    next(err)
  }
}

/**
 * Обновить данные клиента
 * @namespace Client.Controller.updateClient
 */
export const updateClient = async (req: Request, res: Response, next: NextFunction) => {
  const clientId = parseInt(req.params.clientId)

  try {
    logger.info("Обновление клиента", { clientId, data: req.body })

    const client = await clientService.updateClient(clientId, req.body)

    logger.info("Клиент успешно обновлен", { clientId })

    res.json(client)
  } catch (err) {
    logger.error("Ошибка при обновлении клиента", { error: err.message, clientId })

    next(err)
  }
}

/**
 * Удалить клиента
 * @namespace Client.Controller.deleteClient
 */
export const deleteClient = async (req: Request, res: Response, next: NextFunction) => {
  const clientId = parseInt(req.params.clientId)

  try {
    logger.info("Удаление клиента", { clientId })

    const client = await clientService.deleteClient(clientId)

    logger.info("Клиент успешно удален", { clientId })

    res.json(client)
  } catch (err) {
    logger.error("Ошибка при удалении клиента", { error: err.message, clientId })

    next(err)
  }
}

/**
 * Обновить баланс клиента
 * @namespace Client.Controller.updateClientBalance
 */
export const updateClientBalance = async (req: Request, res: Response, next: NextFunction) => {
  const clientId = parseInt(req.params.clientId)
  const balance = parseFloat(req.body.balance)

  try {
    logger.info("Обновление баланса клиента", { clientId, balance })

    const client = await clientService.updateClientBalance(clientId, balance)

    logger.info("Баланс клиента успешно обновлен", { clientId, balance })

    res.json(client)
  } catch (err) {
    logger.error("Ошибка при обновлении баланса клиента", { error: err.message, clientId, balance })

    next(err)
  }
}
