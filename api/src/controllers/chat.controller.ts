/**
 * Контроллер для работы с чатами
 * @namespace Chat.Controller
 */

import { Request, Response, NextFunction } from "express"
import { createControllerLogger } from "@utils/logger"
import * as chatService from "@services/chat.service"
import { createSSE, sessionStorage } from "@utils/sse"
import { SenderEvents, ISenderEndEventData, ISenderErrorEventData } from "@utils/sender"

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
  const sse = sessionStorage.get(chatId)

  if (!sse) {
    logger.error("SSE сессия не найдена", { chatId })

    return res.status(400).json({ error: "SSE сессия не найдена" })
  }

  try {
    logger.info("Отправка сообщения в чат", { chatId, message })

    const sender = await chatService.sendMessage(chatId, message)

    sender.on(SenderEvents.START, async () => {
      logger.info("Сообщение от клиента успешно отправлено", { chatId })

      sse.push({ type: "start" })
    })
    // sender.on(SenderEvents.CHUNK, ({ content }: ISenderEventData) => {
    //   sse.push({ type: "chunk", data: content })
    // })
    sender.on(SenderEvents.ERROR, async ({ error }: ISenderErrorEventData) => {
      logger.error("Ошибка при отправке/получении сообщения", { error: error.message, chatId, message })

      sse.push({ type: "error", message: error.message })
      next(error)
    })
    sender.on(SenderEvents.END, async (messagePair: ISenderEndEventData) => {
      logger.info("Сообщение от AI агента успешно получено", { chatId })

      sse.push({ type: "end", data: messagePair })
      res.json(messagePair)
    })

    sender.process()
  } catch (err) {
    logger.error("Ошибка при отправке сообщения в чат", { error: err.message, chatId, message })
    sse.push({ type: "error", message: err.message })

    next(err)
  }
}

/**
 * Инициализация потока
 * @namespace Chat.Controller.initStream
 */
export const initStream = async (req: Request, res: Response, next: NextFunction) => {
  const chatId = parseInt(req.params.chatId)
  const session = await createSSE(req, res)

  sessionStorage.set(chatId, session)

  try {
    logger.info("Инициализация потока", { chatId })
    session.push({ type: "connected", chatId })
    session.push({ type: "sessions", sessions: Array.from(sessionStorage.keys()) })
    logger.info("Поток успешно инициализирован", { chatId })
  } catch (err) {
    logger.error("Ошибка при инициализации потока", { error: err.message, chatId })
    session.push({ type: "error", message: err.message })

    next(err)
  }
}

/**
 * Отправить сообщение в чат через SSE
 * @namespace Chat.Controller.sendStreamMessage
 */
// export const sendStreamMessage = async (req: Request, res: SseResponse, next: NextFunction) => {
//   const chatId = parseInt(req.params.chatId)
//   const message = req.body.message

//   try {
//     sse.send({ type: "connected", chatId })
//     // const data = await chatService.sendStreamMessage(chatId, message)

//     const interval = setInterval(() => {
//       sse.send({ message, date: Date.now() })
//     }, 2000)

//     // logger.info("Сообщение успешно отправлено", { chatId })

//     // // res.json(data)
//     // req.on("close", () => {
//     //   clearInterval(interval)
//     //   res.end()
//     // })
//     // req.on("close", () => clearInterval(interval))
//   } catch (err) {
//     logger.error("Ошибка при отправке сообщения в чат", { error: err.message, chatId, message })
//     sse.send({ type: "error", message: err.message })
//     res.end()
//   }
// }
