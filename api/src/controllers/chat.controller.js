/**
 * Контроллер для работы с чатами
 * @namespace Chat.Controller
 */

import { createControllerLogger } from "#utils/logger.js"
import * as chatService from "#services/chat.service.js"

// Создаем логгер для контроллера чатов
const logger = createControllerLogger("ChatController")

/**
 * Получает список всех чатов
 * @memberof Chat.Controller
 * @param {Object} req - Объект запроса Express
 * @param {Object} res - Объект ответа Express
 * @param {Function} next
 * @returns {void}
 */
export const getChats = async (req, res, next) => {
  try {
    logger.info("Получение списка всех чатов")

    const chats = await chatService.getChats()

    logger.info("Список чатов успешно получен", {
      count: chats.length
    })

    res.json(chats)
  } catch (err) {
    logger.error("Ошибка при получении списка чатов", {
      error: err.message
    })

    next(err)
  }
}

/**
 * Получает чат по ID
 * @memberof Chat.Controller
 * @param {Object} req - Объект запроса Express
 * @param {Object} res - Объект ответа Express
 * @param {Function} next
 * @returns {void}
 */
export const getChat = async (req, res, next) => {
  const chatId = req.params.chatId

  try {
    logger.info("Получение чата по ID", {
      chatId
    })

    const chat = await chatService.getChatById(chatId)

    logger.info("Чат успешно получен", {
      chatId
    })

    res.json(chat)
  } catch (err) {
    logger.error("Ошибка при получении чата", {
      error: err.message,
      chatId
    })

    next(err)
  }
}

/**
 * Создает новый чат
 * @memberof Chat.Controller
 * @param {Object} req - Объект запроса Express
 * @param {number} req.body.agentId - ID агента
 * @param {number} req.body.clientId - ID клиента
 * @param {string} req.body.title - Название чата
 * @param {Object} res - Объект ответа Express
 * @param {Function} next
 * @returns {void}
 */
export const createChat = async (req, res, next) => {
  try {
    logger.info("Создание нового чата", req.body)

    const chat = await chatService.createChat(req.body)

    logger.info("Чат успешно создан", {
      chatId: chat.id
    })

    res.status(201).json(chat)
  } catch (err) {
    logger.error("Ошибка при создании чата", {
      error: err.message
    })

    next(err)
  }
}

/**
 * Обновляет чат
 * @memberof Chat.Controller
 * @param {Object} req - Объект запроса Express
 * @param {number} req.params.chatId - ID чата
 * @param {string} req.body.title - Новое название чата
 * @param {Object} res - Объект ответа Express
 * @param {Function} next
 * @returns {void}
 */
export const updateChat = async (req, res, next) => {
  const chatId = req.params.chatId
  const { title } = req.body

  try {
    logger.info("Обновление чата", {
      chatId,
      title
    })

    const chat = await chatService.updateChat(chatId, { title })

    logger.info("Чат успешно обновлен", {
      chatId
    })

    res.json(chat)
  } catch (err) {
    logger.error("Ошибка при обновлении чата", {
      error: err.message,
      chatId
    })

    next(err)
  }
}

/**
 * Удаляет чат
 * @memberof Chat.Controller
 * @param {Object} req - Объект запроса Express
 * @param {number} req.params.chatId - ID чата
 * @param {Object} res - Объект ответа Express
 * @param {Function} next
 * @returns {void}
 */
export const deleteChat = async (req, res, next) => {
  const chatId = req.params.chatId

  try {
    logger.info("Удаление чата", {
      chatId
    })

    await chatService.deleteChat(chatId)

    logger.info("Чат успешно удален", {
      chatId
    })

    res.status(204).send()
  } catch (err) {
    logger.error("Ошибка при удалении чата", {
      error: err.message,
      chatId
    })

    next(err)
  }
}

/**
 * Отправляет сообщение в чат
 * @memberof Chat.Controller
 * @param {Object} req - Объект запроса Express
 * @param {number} req.params.chatId - ID чата
 * @param {string} req.body.content - Содержимое сообщения
 * @param {Object} res - Объект ответа Express
 * @param {Function} next
 * @returns {void}
 */
export const sendMessage = async (req, res, next) => {
  const chatId = req.params.chatId
  const content = req.body.content

  try {
    logger.info("Отправка сообщения в чат", {
      chatId,
      content
    })

    const message = await chatService.sendMessage(chatId, content)

    logger.info("Сообщение успешно отправлено", {
      chatId
    })

    res.json(message)
  } catch (err) {
    logger.error("Ошибка при отправке сообщения в чат", {
      error: err.message,
      chatId,
      content
    })
  }
}
