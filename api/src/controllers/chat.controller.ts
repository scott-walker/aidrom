/**
 * Контроллер для работы с чатами
 * @namespace Chat.Controller
 */

import { Request, Response, NextFunction } from "express"
import { createControllerLogger } from "@utils/logger"
import * as chatService from "@services/chat.service"

// Создаем логгер для контроллера чатов
const logger = createControllerLogger("ChatController")

/**
 * Получить список всех чатов
 * @namespace Chat.Controller.getChats
 */
export const getChats = async (req: Request, res: Response, next: NextFunction) => {
  try {
    logger.info("Получение списка всех чатов")

    const chats = await chatService.getChats()

    logger.info("Список чатов успешно получен", { count: chats.length })

    res.json(chats)
  } catch (err) {
    logger.error("Ошибка при получении списка чатов", { error: err.message })

    next(err)
  }
}

/**
 * Получить чат по ID
 * @namespace Chat.Controller.getChat
 */
export const getChat = async (req: Request, res: Response, next: NextFunction) => {
  const chatId = parseInt(req.params.chatId)

  try {
    logger.info("Получение чата по ID", { chatId })

    const chat = await chatService.getChatById(chatId)

    logger.info("Чат успешно получен", { chatId })

    res.json(chat)
  } catch (err) {
    logger.error("Ошибка при получении чата", { error: err.message, chatId })

    next(err)
  }
}

/**
 * Создать новый чат
 * @namespace Chat.Controller.createChat
 */
export const createChat = async (req: Request, res: Response, next: NextFunction) => {
  try {
    logger.info("Создание нового чата", req.body)

    const chat = await chatService.createChat(req.body)

    logger.info("Чат успешно создан", { chatId: chat.id })

    res.status(201).json(chat)
  } catch (err) {
    logger.error("Ошибка при создании чата", { error: err.message })

    next(err)
  }
}

/**
 * Обновить чат
 * @namespace Chat.Controller.updateChat
 */
export const updateChat = async (req: Request, res: Response, next: NextFunction) => {
  const chatId = parseInt(req.params.chatId)
  const { title } = req.body

  try {
    logger.info("Обновление чата", { chatId, title })

    const chat = await chatService.updateChat(chatId, { title })

    logger.info("Чат успешно обновлен", { chatId })

    res.json(chat)
  } catch (err) {
    logger.error("Ошибка при обновлении чата", { error: err.message, chatId })

    next(err)
  }
}

/**
 * Удалить чат
 * @namespace Chat.Controller.deleteChat
 */
export const deleteChat = async (req: Request, res: Response, next: NextFunction) => {
  const chatId = parseInt(req.params.chatId)

  try {
    logger.info("Удаление чата", { chatId })

    await chatService.deleteChat(chatId)

    logger.info("Чат успешно удален", { chatId })

    res.json({ message: "Чат успешно удален" })
  } catch (err) {
    logger.error("Ошибка при удалении чата", { error: err.message, chatId })

    next(err)
  }
}

/**
 * Оптимизировать контекст чата
 * @namespace Chat.Controller.optimizeChatContext
 */
export const optimizeChatContext = async (req: Request, res: Response, next: NextFunction) => {
  const chatId = parseInt(req.params.chatId)

  try {
    logger.info("Оптимизация контекста чата", { chatId })

    const context = await chatService.optimizeChatContext(chatId)

    logger.info("Контекст чата успешно оптимизирован", { chatId })

    res.json({ message: "Контекст чата успешно оптимизирован", context })
  } catch (err) {
    logger.error("Ошибка при оптимизации контекста чата", { error: err.message, chatId })

    next(err)
  }
}

/**
 * Очистить контекст чата
 * @namespace Chat.Controller.clearChatContext
 */
export const clearChatContext = async (req: Request, res: Response, next: NextFunction) => {
  const chatId = parseInt(req.params.chatId)

  try {
    logger.info("Очистка контекста чата", { chatId })

    const context = await chatService.clearChatContext(chatId)

    logger.info("Контекст чата успешно очищен", { chatId })

    res.json({ message: "Контекст чата успешно очищен", context })
  } catch (err) {
    logger.error("Ошибка при очистке контекста чата", { error: err.message, chatId })

    next(err)
  }
}

/**
 * Отправить сообщение в чат
 * @namespace Chat.Controller.sendMessage
 */
export const sendMessage = async (req: Request, res: Response, next: NextFunction) => {
  const chatId = parseInt(req.params.chatId)
  const message = req.body.message

  try {
    logger.info("Отправка сообщения в чат", { chatId, message })

    const data = await chatService.sendMessage(chatId, message)

    logger.info("Сообщение успешно отправлено", { chatId })

    res.json(data)
  } catch (err) {
    logger.error("Ошибка при отправке сообщения в чат", { error: err.message, chatId, message })

    next(err)
  }
}
