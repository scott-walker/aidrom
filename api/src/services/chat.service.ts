/**
 * Сервис для работы с чатами
 * @namespace Chat.Service
 */

import { eq, desc } from "drizzle-orm"
import {
  db,
  chats,
  messagePairs,
  clientMessages,
  agentMessages,
  mapChat,
  Chat,
  CreateChatData,
  UpdateChatData,
  ClientMessage,
  AgentMessage,
  RequestWithResponseContent,
  ChatContext,
  CommunicationRoles
} from "@db"
import { createServiceLogger } from "@utils/logger"
import { NotFoundError } from "@utils/errors"
import { sendRequest } from "@services/agent.service"

/**
 * Интерфейс результата отправки сообщения
 * @namespace Chat.Service.SendMessageResult
 */
interface SendMessageResult {
  chatId: number
  messagePairId: number
  requestId: number
  clientMessage: ClientMessage
  agentMessage: AgentMessage
}

// Создаем логгер для сервиса чатов
const logger = createServiceLogger("ChatService")

/**
 * Получить все чаты из базы данных
 * @namespace Chat.Service.getChats
 */
export const getChats = async (): Promise<Chat[]> => {
  try {
    logger.info("Получение всех чатов из БД")

    const items = await db.query.chats.findMany({
      orderBy: [desc(chats.updatedAt)],
      with: {
        // agent: true
      }
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
export const getChatById = async (chatId: number): Promise<Chat> => {
  try {
    logger.info("Получение чата по ID", { chatId })

    const chat = await db.query.chats.findFirst({
      where: eq(chats.id, chatId),
      with: {
        // agent: true,
        // client: true,
        messagePairs: {
          with: {
            clientMessage: true,
            agentMessage: true
          }
        }
      }
    })

    if (!chat) {
      throw new NotFoundError(`Чат с ID #${chatId} не найден`)
    }

    logger.info("Чат по ID успешно найден", { chatId })

    return mapChat(chat as Chat)
  } catch (error) {
    logger.error("Ошибка при получении чата по ID", { error: error.message, chatId })

    throw error
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
 * Отправляет сообщение в чат
 * @namespace Chat.Service.sendMessage
 */
export const sendMessage = async (chatId: number, message: string): Promise<SendMessageResult> => {
  try {
    logger.info("Отправка сообщения в чат", { chatId, message })

    // Получить чат по ID
    const chat = (await db.query.chats.findFirst({ where: eq(chats.id, chatId) })) as Chat

    if (!chat) {
      throw new NotFoundError(`Чат с ID #${chatId} не найден`)
    }

    // Отправляем запрос к API
    logger.info("Отправка запроса к API")
    const request: RequestWithResponseContent = await sendRequest({
      agentId: chat.agentId,
      clientId: chat.clientId,
      chatСontext: chat.context,
      message
    })

    // Создаем сообщение клиента
    logger.info("Создание сообщения клиента")
    const [clientMessage] = await db.insert(clientMessages).values({ content: message }).returning()
    pushChatContext(chat, CommunicationRoles.Client, message)

    // Создаем сообщение агента
    logger.info("Создание сообщения агента")
    const [agentMessage] = await db.insert(agentMessages).values({ content: request.responseContent }).returning()
    pushChatContext(chat, CommunicationRoles.Agent, request.responseContent)

    // Создаем messagePair с ID сообщений
    logger.info("Создание messagePair")
    const [messagePair] = await db
      .insert(messagePairs)
      .values({
        chatId: chatId,
        requestId: request.id,
        clientMessageId: clientMessage.id,
        agentMessageId: agentMessage.id
      })
      .returning()

    // Обновляем дату последнего обновления чата
    logger.info("Обновление даты последнего обновления чата")

    await db
      .update(chats)
      .set({
        updatedAt: new Date(),
        context: chat.context
      })
      .where(eq(chats.id, chatId))

    logger.info("Сообщение успешно отправлено в чат", {
      chatId: chatId,
      messagePairId: messagePair.id,
      requestId: request.id,
      clientMessageId: clientMessage.id,
      agentMessageId: agentMessage.id
    })

    return {
      chatId,
      messagePairId: messagePair.id,
      requestId: request.id,
      clientMessage,
      agentMessage
    }
  } catch (error) {
    logger.error("Ошибка при отправке сообщения в чат", { error: error.message, chatId, message })

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
export const optimizeChatContext = async (chatId: number): Promise<ChatContext> => {
  try {
    logger.info("Оптимизация контекста чата", { chatId })

    const chat = (await db.query.chats.findFirst({ where: eq(chats.id, chatId) })) as Chat

    if (!chat) {
      throw new NotFoundError(`Чат с ID #${chatId} не найден`)
    }

    // Отправляем запрос на оптимизацию контекста к API
    logger.info("Отправка запроса к API")
    const request: RequestWithResponseContent = await sendRequest({
      agentId: chat.agentId,
      clientId: chat.clientId,
      chatСontext: chat.context,
      message: "Подведи итог нашего общения. Сформулируй основные факты, мысли и идеи, которые мы обсуждали."
    })

    // Обновляем контекст чата
    logger.info("Обновление контекста чата")
    resetChatContext(chat)
    pushChatContext(chat, CommunicationRoles.Agent, request.responseContent)

    await db
      .update(chats)
      .set({
        context: chat.context,
        updatedAt: new Date()
      })
      .where(eq(chats.id, chatId))

    logger.info("Контекст чата успешно оптимизирован", { chatId })

    return chat.context
  } catch (error) {
    logger.error("Ошибка при оптимизации контекста чата", { error: error.message, chatId })

    throw error
  }
}

/**
 * Создать запись в контексте чата
 * @namespace Chat.Service.pushChatContext
 */
export const pushChatContext = (chat: Chat, role: CommunicationRoles, content: string): Chat => {
  const context: ChatContext = [...chat.context, { role, content }]

  chat.context = context

  return chat
}

/**
 * Сбросить контекст чата
 * @namespace Chat.Service.resetChatContext
 */
export const resetChatContext = (chat: Chat): Chat => {
  const context: ChatContext = []

  chat.context = context

  return chat
}
