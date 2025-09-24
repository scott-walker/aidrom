/**
 * Сервис для работы с чатами
 * @namespace Chat.Service
 */

import { eq, desc, asc } from "drizzle-orm"
import {
  db,
  chats,
  messagePairs,
  mapChat,
  Chat,
  CreateChatData,
  UpdateChatData,
  ChatContext,
  CommunicationRoles,
  MessagePair,
  Message,
  mapMessagePairToMessages
} from "@db"
import { createServiceLogger } from "@utils/logger"
import { NotFoundError } from "@utils/errors"
import { sendRequest } from "@services/agent.service"
import { DriverRequestMessageRole, DriverRequestMessages } from "@drivers"
import { ISender, SenderEvents } from "@utils/sender"

// Создаем логгер для сервиса чатов
const logger = createServiceLogger("ChatService")

/**
 * Параметры получения чата по ID
 * @namespace Chat.Service.GetChatByIdParams
 */
export interface GetChatByIdParams {
  withContext?: boolean
}

/**
 * Получить все чаты из базы данных
 * @namespace Chat.Service.getChats
 */
export const getChats = async (): Promise<Chat[]> => {
  try {
    logger.info("Получение всех чатов из БД")

    const items = await db.query.chats.findMany({
      orderBy: [desc(chats.updatedAt)]
    })

    logger.info("Запрос к БД выполнен успешно", { count: items.length })

    return items.map(item => mapChat(item as Chat))
  } catch (error) {
    logger.error("Ошибка при получении всех чатов из БД", { error: error.message })

    throw error
  }
}

/**
 * Получить чат по его идентификатору
 * @namespace Chat.Service.getChatById
 */
export const getChatById = async (chatId: number, { withContext = false }: GetChatByIdParams = {}): Promise<Chat> => {
  try {
    logger.info("Получение чата по ID", { chatId })

    const chat = await db.query.chats.findFirst({
      where: eq(chats.id, chatId)
      // with: {
      //   messagePairs: {
      //     orderBy: [asc(messagePairs.createdAt)]
      //   }
      // }
    })

    if (!chat) {
      throw new NotFoundError(`Чат с ID #${chatId} не найден`)
    }

    logger.info("Чат по ID успешно найден", { chatId })

    return mapChat(chat as Chat, { withContext })
  } catch (error) {
    logger.error("Ошибка при получении чата по ID", { error: error.message, chatId })

    throw error
  }
}

/**
 * Получить сообщения чата по его идентификатору
 * @namespace Chat.Service.getChatMessages
 */
export const getChatMessages = async (chatId: number): Promise<Message[]> => {
  try {
    logger.info("Получение сообщений чата по ID", { chatId })

    const messagePairItems = await db.query.messagePairs.findMany({
      where: eq(messagePairs.chatId, chatId),
      orderBy: [asc(messagePairs.createdAt)]
    })

    const messages = messagePairItems.reduce((messages: Message[], messagePair: MessagePair) => {
      return [...messages, ...mapMessagePairToMessages(messagePair)]
    }, [])

    logger.info("Сообщения чата успешно получены", { chatId, count: messages.length })

    return messages
  } catch (error) {
    logger.error("Ошибка при получении сообщений чата по ID", { error: error.message, chatId })
  }
}

/**
 * Создать новый чат
 * @namespace Chat.Service.createChat
 */
export const createChat = async (data: CreateChatData): Promise<Chat> => {
  try {
    logger.info("Создание нового чата в БД", data)

    const [chat] = await db.insert(chats).values(data).returning()

    logger.info("Чат успешно создан в БД", { chatId: chat.id })

    return mapChat(chat as Chat)
  } catch (error) {
    logger.error("Ошибка при создании чата в БД", { error: error.message, data })

    throw error
  }
}

/**
 * Обновить данные чата
 * @namespace Chat.Service.updateChat
 */
export const updateChat = async (chatId: number, data: UpdateChatData): Promise<Chat> => {
  try {
    logger.info("Обновление чата в БД", { chatId, data })

    data.updatedAt = new Date()

    const [chat] = await db.update(chats).set(data).where(eq(chats.id, chatId)).returning()

    if (!chat) {
      throw new NotFoundError(`Чат с ID #${chatId} не найден`)
    }

    logger.info("Чат успешно обновлен в БД", { chatId })

    return mapChat(chat as Chat)
  } catch (error) {
    logger.error("Ошибка при обновлении чата в БД", { error: error.message, chatId })

    throw error
  }
}

/**
 * Удалить чат
 * @namespace Chat.Service.deleteChat
 */
export const deleteChat = async (chatId: number): Promise<void> => {
  try {
    logger.info("Удаление чата из БД", { chatId })

    const [chat] = await db.delete(chats).where(eq(chats.id, chatId)).returning()

    if (!chat) {
      throw new NotFoundError(`Чат с ID #${chatId} не найден`)
    }

    logger.info("Чат успешно удален из БД", { chatId })
  } catch (error) {
    logger.error("Ошибка при удалении чата из БД", { error: error.message, chatId })

    throw error
  }
}

/**
 * Отправить сообщение в чат
 * @namespace Chat.Service.sendMessage
 */
export const sendMessage = async (chatId: number, message: string): Promise<ISender> => {
  try {
    logger.info("Отправка сообщения в чат", { chatId, message })

    // Получить чат по ID
    const chat = (await db.query.chats.findFirst({ where: eq(chats.id, chatId) })) as Chat

    if (!chat) {
      throw new NotFoundError(`Чат с ID #${chatId} не найден`)
    }

    // Создаем messagePair с ID сообщений
    logger.info("Создание пары сообщений (messagePair)", { chatId })
    const [messagePair] = await db
      .insert(messagePairs)
      .values({
        chatId: chatId,
        requestId: null,
        clientMessage: message,
        agentMessage: null
      })
      .returning()

    // Обновить контекст чата сообщением клиента
    logger.info("Добавление сообщения клиента в контекст чата", { chatId })
    await pushChatContext(chat, CommunicationRoles.Client, message)

    // Отправляем запрос к API
    logger.info("Создание запроса к API", { chatId })
    const sender = await sendRequest({
      agentId: chat.agentId,
      messages: makeChatContextMessages(chat.context, message)
    })

    // Обработать событие завершения отправки сообщения к агенту
    sender.on(SenderEvents.AGENT_SEND_COMPLETE, async ({ requestId, responseContent }) => {
      const messagePairId = messagePair.id

      // Обновить messagePair с ID запроса
      logger.info("Обновление messagePair с ID запроса", { action: "onComplete" })
      const [updatedMessagePair] = await db
        .update(messagePairs)
        .set({
          requestId,
          agentMessage: responseContent
        })
        .where(eq(messagePairs.id, messagePairId))
        .returning()

      // Обновить контекст чата сообщением агента
      logger.info("Добавление сообщения агента в контекст чата", { action: "onComplete", chatId })
      await pushChatContext(chat, CommunicationRoles.Agent, responseContent)

      const messages = await getChatMessages(chatId)

      // Еммитеть о завершении всей операции
      sender.emit(SenderEvents.END, { chatId, messages })
      logger.info("Сообщение от AI агента успешно получено", {
        action: "onComplete",
        chatId,
        messagePairId,
        requestId
      })
    })

    return sender
  } catch (error) {
    logger.error("Ошибка при отправке сообщения в чат", { chatId, error: error.message })

    throw error
  }
}

/**
 * Очистить контекст чата
 * @namespace Chat.Service.clearChatContext
 */
export const clearChatContext = async (chatId: number): Promise<ChatContext> => {
  try {
    logger.info("Очистка контекста чата", { chatId })

    const [chat] = (await db
      .update(chats)
      .set({ context: [], updatedAt: new Date() })
      .where(eq(chats.id, chatId))
      .returning()) as Chat[]

    logger.info("Контекст чата успешно очищен", { chatId })

    return chat.context
  } catch (error) {
    logger.error("Ошибка при очистке контекста чата", { error: error.message, chatId })

    throw error
  }
}

/**
 * Оптимизировать контекст чата (сократить контекст)
 * @namespace Chat.Service.optimizeChatContext
 */
export const optimizeChatContext = async (chatId: number, instruction: string): Promise<ISender> => {
  try {
    logger.info("Оптимизация контекста чата", { chatId })

    const chat = (await db.query.chats.findFirst({ where: eq(chats.id, chatId) })) as Chat

    if (!chat) {
      throw new NotFoundError(`Чат с ID #${chatId} не найден`)
    }

    // Отправляем запрос на оптимизацию контекста к API
    logger.info("Создание запроса к API")
    const sender = await sendRequest({
      agentId: chat.agentId,
      messages: makeChatContextMessages(chat.context, instruction)
    })

    sender.on(SenderEvents.AGENT_SEND_COMPLETE, async ({ responseContent }) => {
      logger.info("Запрос успешно обработан", { action: "onComplete" })

      await setChatContext(chat, CommunicationRoles.Agent, responseContent)

      sender.emit(SenderEvents.END, { context: chat.context })
      logger.info("Контекст чата успешно оптимизирован", { chatId })
    })

    return sender
  } catch (error) {
    logger.error("Ошибка при оптимизации контекста чата", { error: error.message, chatId })

    throw error
  }
}

/**
 * Создать запись в контексте чата
 * @namespace Chat.Service.pushChatContext
 */
export const pushChatContext = async (chat: Chat, role: CommunicationRoles, content: string): Promise<Chat> => {
  const context: ChatContext = [...chat.context, { role, content }]

  return await updateChatContext(chat, context)
}

/**
 * Установить контекст чата
 * @namespace Chat.Service.setChatContext
 */
export const setChatContext = async (chat: Chat, role: CommunicationRoles, content: string): Promise<Chat> => {
  const context: ChatContext = [{ role, content }]

  return await updateChatContext(chat, context)
}

/**
 * Сбросить контекст чата
 * @namespace Chat.Service.resetChatContext
 */
export const resetChatContext = async (chat: Chat): Promise<Chat> => await updateChatContext(chat, [])

/**
 * Обновить контекст чата
 * @namespace Chat.Service.updateChatContext
 */
export const updateChatContext = async (chat: Chat, context: ChatContext): Promise<Chat> => {
  await db.update(chats).set({ context: context, updatedAt: new Date() }).where(eq(chats.id, chat.id))

  return chat
}

/**
 * Создать сообщения из контекста чата и запроса клиента
 * @namespace Chat.Service.makeChatContextMessages
 */
const makeChatContextMessages = (chatContext: ChatContext, clientMessageContent: string): DriverRequestMessages => {
  const mapRoles = {
    [CommunicationRoles.Client]: DriverRequestMessageRole.USER,
    [CommunicationRoles.Agent]: DriverRequestMessageRole.ASSISTANT
  }

  const chatMessages = chatContext.map(item => ({
    role: mapRoles[item.role],
    content: item.content
  }))
  const clientMessage = {
    role: mapRoles[CommunicationRoles.Client],
    content: clientMessageContent
  }

  return [...chatMessages, clientMessage]
}
