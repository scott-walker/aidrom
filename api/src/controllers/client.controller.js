/**
 * Контроллер для работы с клиентами
 * @namespace Client.Controller
 */

import { createControllerLogger } from "#utils/logger.js"
import * as clientService from "#services/client.service.js"

// Создаем логгер для контроллера клиентов
const logger = createControllerLogger("ClientController")

/**
 * Получает список всех клиентов
 * @memberof Client.Controller
 * @param {Object} req - Объект запроса Express
 * @param {Object} res - Объект ответа Express
 * @param {Function} next
 * @returns {void}
 */
export const getClients = async (req, res, next) => {
  try {
    logger.info("Получение списка всех клиентов")

    const clients = await clientService.getClients()

    logger.info("Список клиентов успешно получен", {
      count: clients.length
    })

    res.json(clients)
  } catch (err) {
    logger.error("Ошибка при получении списка клиентов", {
      error: err.message
    })

    next(err)
  }
}

/**
 * Получает клиента по ID
 * @memberof Client.Controller
 * @param {Object} req - Объект запроса Express
 * @param {Object} res - Объект ответа Express
 * @param {Function} next
 * @returns {void}
 */
export const getClient = async (req, res, next) => {
  const clientId = req.params.clientId

  try {
    logger.info("Получение клиента по ID", {
      clientId
    })

    const client = await clientService.getClientById(clientId)

    logger.info("Клиент успешно получен", {
      clientId
    })

    res.json(client)
  } catch (err) {
    logger.error("Ошибка при получении клиента", {
      error: err.message,
      clientId
    })

    next(err)
  }
}

/**
 * Получает клиента по email
 * @memberof Client.Controller
 * @param {Object} req - Объект запроса Express
 * @param {Object} res - Объект ответа Express
 * @param {Function} next
 * @returns {void}
 */
export const getClientByEmail = async (req, res, next) => {
  const email = req.params.email

  try {
    logger.info("Получение клиента по email", {
      email
    })

    const client = await clientService.getClientByEmail(email)

    logger.info("Клиент по email успешно получен", {
      email
    })

    res.json(client)
  } catch (err) {
    logger.error("Ошибка при получении клиента по email", {
      error: err.message,
      email
    })

    next(err)
  }
}

/**
 * Создает нового клиента
 * @memberof Client.Controller
 * @param {Object} req - Объект запроса Express
 * @param {string} req.body.email - Email клиента
 * @param {number} [req.body.balance] - Баланс клиента
 * @param {Object} res - Объект ответа Express
 * @param {Function} next
 * @returns {void}
 */
export const createClient = async (req, res, next) => {
  try {
    logger.info("Создание нового клиента", req.body)

    const client = await clientService.createClient(req.body)

    logger.info("Клиент успешно создан", {
      clientId: client.id
    })

    res.status(201).json(client)
  } catch (err) {
    logger.error("Ошибка при создании клиента", {
      error: err.message
    })

    next(err)
  }
}

/**
 * Обновляет данные клиента
 * @memberof Client.Controller
 * @param {Object} req - Объект запроса Express
 * @param {string|number} req.params.clientId - ID клиента
 * @param {Object} req.body - Данные для обновления
 * @param {string} [req.body.email] - Email клиента
 * @param {number} [req.body.balance] - Баланс клиента
 * @param {Object} res - Объект ответа Express
 * @param {Function} next
 * @returns {void}
 */
export const updateClient = async (req, res, next) => {
  const clientId = req.params.clientId

  try {
    logger.info("Обновление клиента", {
      clientId,
      data: req.body
    })

    const client = await clientService.updateClient(clientId, req.body)

    logger.info("Клиент успешно обновлен", {
      clientId
    })

    res.json(client)
  } catch (err) {
    logger.error("Ошибка при обновлении клиента", {
      error: err.message,
      clientId
    })

    next(err)
  }
}

/**
 * Удаляет клиента
 * @memberof Client.Controller
 * @param {Object} req - Объект запроса Express
 * @param {string|number} req.params.clientId - ID клиента
 * @param {Object} res - Объект ответа Express
 * @param {Function} next
 * @returns {void}
 */
export const deleteClient = async (req, res, next) => {
  const clientId = req.params.clientId

  try {
    logger.info("Удаление клиента", {
      clientId
    })

    const client = await clientService.deleteClient(clientId)

    logger.info("Клиент успешно удален", {
      clientId
    })

    res.json(client)
  } catch (err) {
    logger.error("Ошибка при удалении клиента", {
      error: err.message,
      clientId
    })

    next(err)
  }
}

/**
 * Обновляет баланс клиента
 * @memberof Client.Controller
 * @param {Object} req - Объект запроса Express
 * @param {string|number} req.params.clientId - ID клиента
 * @param {number} req.body.balance - Новый баланс клиента
 * @param {Object} res - Объект ответа Express
 * @param {Function} next
 * @returns {void}
 */
export const updateClientBalance = async (req, res, next) => {
  const clientId = req.params.clientId
  const { balance } = req.body

  try {
    logger.info("Обновление баланса клиента", {
      clientId,
      balance
    })

    const client = await clientService.updateClientBalance(clientId, balance)

    logger.info("Баланс клиента успешно обновлен", {
      clientId,
      balance
    })

    res.json(client)
  } catch (err) {
    logger.error("Ошибка при обновлении баланса клиента", {
      error: err.message,
      clientId,
      balance
    })

    next(err)
  }
}
