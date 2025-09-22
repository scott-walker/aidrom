/**
 * Контроллер для работы с чатами
 * @namespace Chat.Controller
 */

import { Request, Response, NextFunction } from "express"
import { createControllerLogger } from "@utils/logger"
import * as chatService from "@services/chat.service"
import { createSSE, SSEMessageType, SSESession } from "@utils/sse"
import { SenderEvents, ISenderEndEventData, ISenderErrorEventData, ISenderContentEventData } from "@utils/sender"

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
  const instruction =
    req.body.instruction ||
    "Подведи итог нашего общения. Сформулируй кратко основные факты, мысли и идеи, которые мы обсуждали."

  try {
    logger.info("Оптимизация контекста чата", { chatId })

    const sender = await chatService.optimizeChatContext(chatId, instruction)

    sender.on(SenderEvents.END, async ({ context }: ISenderEndEventData) => {
      logger.info("Контекст чата успешно оптимизирован", { chatId })

      res.json({ message: "Контекст чата успешно оптимизирован", context })
    })

    sender.process()
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
  const sseManager = createSSE(req, res)
  let sse: SSESession

  try {
    sse = sseManager.get(chatId)
  } catch (err) {
    logger.error("Ошибка при получении SSE сессии", { error: err.message, chatId })

    return next(err)
  }

  try {
    logger.info("Инциализация отправки сообщения", { chatId, message })

    const sender = await chatService.sendMessage(chatId, message)

    // Начало отправки сообщения
    sender.on(SenderEvents.START, async () => {
      logger.info("Начало отправки сообщения", { action: "onStart", chatId })

      sse.push({ type: SSEMessageType.Start })
    })

    // Получение содержимого сообщения
    sender.on(SenderEvents.PUSH_CONTENT, async ({ content }: ISenderContentEventData) => {
      sse.push({ type: SSEMessageType.Content, content })
    })

    // Ошибка при отправке/получении сообщения
    sender.on(SenderEvents.ERROR, async ({ error }: ISenderErrorEventData) => {
      logger.error("Ошибка при отправке/получении сообщения", {
        action: "onError",
        error: error.message,
        chatId,
        message
      })

      sse.push({ type: SSEMessageType.Error, message: error.message })

      next(error)
    })

    // Завершение получения сообщения
    sender.on(SenderEvents.END, async (messagePair: ISenderEndEventData) => {
      logger.info("Сообщение от AI агента успешно получено", { action: "onEnd", chatId })

      sse.push({ type: SSEMessageType.End, data: messagePair })
      res.json(messagePair)
    })

    // Начать процесс отправки сообщения
    sender.process()
  } catch (err) {
    logger.error("Ошибка при отправке сообщения в чат", { action: "sendMessage", error: err.message, chatId, message })

    sse.push({ type: SSEMessageType.Error, message: err.message })

    next(err)
  }
}

/**
 * Инициализация потока
 * @namespace Chat.Controller.initStream
 */
export const initStream = async (req: Request, res: Response, next: NextFunction) => {
  const chatId = parseInt(req.params.chatId)
  const sseManager = createSSE(req, res)

  try {
    logger.info("Поток успешно инициализирован", { chatId })

    await sseManager.open(chatId)

    req.on("close", () => sseManager.close(chatId))
    req.on("end", () => sseManager.close(chatId))
  } catch (err) {
    logger.error("Ошибка при инициализации потока", { error: err.message, chatId })

    next(err)
  }
}
