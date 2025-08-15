/**
 * Контроллер для работы с парами сообщений
 * @namespace MessagePair.Controller
 */

import { createControllerLogger } from "#utils/logger.js"
import * as messagePairService from "#services/messagePair.service.js"

// Создаем логгер для контроллера пар сообщений
const logger = createControllerLogger("MessagePairController")

/**
 * Получает пары сообщений для чата
 * @memberof MessagePair.Controller
 * @param {Object} req - Объект запроса Express
 * @param {number} req.params.chatId - ID чата
 * @param {Object} res - Объект ответа Express
 * @param {Function} next
 * @returns {void}
 */
export const getMessagePairs = async (req, res, next) => {
  const chatId = req.params.chatId

  try {
    logger.info("Получение пар сообщений для чата", {
      chatId
    })

    const messagePairs = await messagePairService.getMessagePairsByChatId(chatId)

    logger.info("Пары сообщений успешно получены", {
      chatId,
      count: messagePairs.length
    })

    res.json(messagePairs)
  } catch (err) {
    logger.error("Ошибка при получении пар сообщений", {
      error: err.message,
      chatId
    })

    next(err)
  }
}

/**
 * Получает пару сообщений по ID
 * @memberof MessagePair.Controller
 * @param {Object} req - Объект запроса Express
 * @param {number} req.params.messagePairId - ID пары сообщений
 * @param {Object} res - Объект ответа Express
 * @param {Function} next
 * @returns {void}
 */
export const getMessagePair = async (req, res, next) => {
  const messagePairId = req.params.messagePairId

  try {
    logger.info("Получение пары сообщений по ID", {
      messagePairId
    })

    const messagePair = await messagePairService.getMessagePairById(messagePairId)

    logger.info("Пара сообщений успешно получена", {
      messagePairId
    })

    res.json(messagePair)
  } catch (err) {
    logger.error("Ошибка при получении пары сообщений", {
      error: err.message,
      messagePairId
    })

    next(err)
  }
}

/**
 * Создает новую пару сообщений
 * @memberof MessagePair.Controller
 * @param {Object} req - Объект запроса Express
 * @param {number} req.params.chatId - ID чата
 * @param {string} req.body.content - Содержимое сообщения клиента
 * @param {string} req.body.bot - Название бота для ответа
 * @param {Object} res - Объект ответа Express
 * @param {Function} next
 * @returns {void}
 */
export const createMessagePair = async (req, res, next) => {
  const chatId = req.params.chatId
  const { content, bot } = req.body

  try {
    logger.info("Создание новой пары сообщений", {
      chatId,
      bot,
      content
    })

    const messagePair = await messagePairService.createMessagePair(chatId, content, bot)

    logger.info("Пара сообщений успешно создана", {
      chatId,
      messagePairId: messagePair.id
    })

    res.status(201).json(messagePair)
  } catch (err) {
    logger.error("Ошибка при создании пары сообщений", {
      error: err.message,
      chatId,
      bot
    })

    next(err)
  }
}

/**
 * Обновляет пару сообщений
 * @memberof MessagePair.Controller
 * @param {Object} req - Объект запроса Express
 * @param {number} req.params.messagePairId - ID пары сообщений
 * @param {string} req.body.title - Новое название пары
 * @param {string} req.body.status - Новый статус
 * @param {Object} res - Объект ответа Express
 * @param {Function} next
 * @returns {void}
 */
export const updateMessagePair = async (req, res, next) => {
  const messagePairId = req.params.messagePairId
  const { title, status } = req.body

  try {
    logger.info("Обновление пары сообщений", {
      messagePairId,
      title,
      status
    })

    const messagePair = await messagePairService.updateMessagePair(messagePairId, { title, status })

    logger.info("Пара сообщений успешно обновлена", {
      messagePairId
    })

    res.json(messagePair)
  } catch (err) {
    logger.error("Ошибка при обновлении пары сообщений", {
      error: err.message,
      messagePairId
    })

    next(err)
  }
}

/**
 * Удаляет пару сообщений
 * @memberof MessagePair.Controller
 * @param {Object} req - Объект запроса Express
 * @param {number} req.params.messagePairId - ID пары сообщений
 * @param {Object} res - Объект ответа Express
 * @param {Function} next
 * @returns {void}
 */
export const deleteMessagePair = async (req, res, next) => {
  const messagePairId = req.params.messagePairId

  try {
    logger.info("Удаление пары сообщений", {
      messagePairId
    })

    await messagePairService.deleteMessagePair(messagePairId)

    logger.info("Пара сообщений успешно удалена", {
      messagePairId
    })

    res.status(204).send()
  } catch (err) {
    logger.error("Ошибка при удалении пары сообщений", {
      error: err.message,
      messagePairId
    })

    next(err)
  }
}

/**
 * Добавляет сообщение агента в избранное
 * @memberof MessagePair.Controller
 * @param {Object} req - Объект запроса Express
 * @param {number} req.params.messagePairId - ID пары сообщений
 * @param {Object} res - Объект ответа Express
 * @param {Function} next
 * @returns {void}
 */
export const toggleFavorite = async (req, res, next) => {
  const messagePairId = req.params.messagePairId

  try {
    logger.info("Переключение избранного для пары сообщений", {
      messagePairId
    })

    const messagePair = await messagePairService.toggleFavorite(messagePairId)

    logger.info("Избранное успешно переключено", {
      messagePairId,
      isFavorite: messagePair.agentMessage.isFavorite
    })

    res.json(messagePair)
  } catch (err) {
    logger.error("Ошибка при переключении избранного", {
      error: err.message,
      messagePairId
    })

    next(err)
  }
}
