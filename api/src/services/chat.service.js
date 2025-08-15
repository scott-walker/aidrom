/**
 * Сервис для работы с чатами
 * @namespace Chat.Service
 */

import { eq, desc } from "drizzle-orm"
import { db } from "#db/index.js"
import { chats } from "#db/schema/chats.js"
import { agents } from "#db/schema/agents.js"
import { clients } from "#db/schema/clients.js"
import { messagePairs } from "#db/schema/messagePairs.js"
import { clientMessages } from "#db/schema/clientMessages.js"
import { agentMessages } from "#db/schema/agentMessages.js"
import { complexSelectors, selectors } from "#db/selectors.js"
import { createServiceLogger } from "#utils/logger.js"
import { NotFoundError } from "#utils/errors.js"
import { sendRequest } from "#services/agent.service.js"

// Создаем логгер для сервиса чатов
const logger = createServiceLogger("ChatService")

/**
 * Получает все чаты из базы данных
 * @memberof Chat.Service
 * @returns {Promise<Array<Object>>} Массив объектов с информацией о чатах.
 */
export const getChats = async () => {
  try {
    logger.info("Получение всех чатов из БД")

    const items = await db
      .select(selectors.chat)
      .from(chats)
      // .leftJoin(agents, eq(chats.agentId, agents.id))
      // .leftJoin(clients, eq(chats.clientId, clients.id))
      .orderBy(desc(chats.updatedAt))

    logger.info("Запрос к БД выполнен успешно", {
      count: items.length
    })

    return items
  } catch (error) {
    logger.error("Ошибка при получении всех чатов из БД", {
      error: error.message
    })

    throw error
  }
}

/**
 * Получает чат по его идентификатору
 * @memberof Chat.Service
 * @param {string|number} chatId - Идентификатор чата.
 * @returns {Promise<Object>} Объект с информацией о чате.
 */
export const getChatById = async chatId => {
  try {
    logger.info("Получение чата по ID", {
      chatId
    })

    const item = await db.query.chats.findFirst({
      where: eq(chats.id, chatId),
      with: {
        messagePairs: {
          with: {
            clientMessage: true,
            agentMessage: true
          }
        }
      }
    })

    if (!item) {
      throw new NotFoundError(`Чат с ID #${chatId} не найден`)
    }

    logger.info("Чат по ID успешно найден", {
      chatId
    })

    return item
  } catch (error) {
    logger.error("Ошибка при получении чата по ID", {
      error: error.message,
      chatId
    })

    throw error
  }
}

/**
 * Создает новый чат
    const [item] = await db
      .select(complexSelectors.chatWithMessagePairs)
      .from(chats)
      .leftJoin(agents, eq(chats.agentId, agents.id))
      .leftJoin(clients, eq(chats.clientId, clients.id))
      .leftJoin(messagePairs, eq(chats.id, messagePairs.chatId))
      .where(eq(chats.id, chatId))

    if (!item) {
      throw new NotFoundError(`Чат с ID #${chatId} не найден`)
    }

    logger.info("Чат по ID успешно найден", {
      chatId
    })

    return item
  } catch (error) {
    logger.error("Ошибка при получении чата по ID", {
      error: error.message,
      chatId
    })

    throw error
  }
}

/**
 * Создает новый чат
 * @memberof Chat.Service
 * @param {Object} data - Данные для создания чата
 * @param {number} data.agentId - ID агента
 * @param {number} data.clientId - ID клиента
 * @param {string} data.title - Название чата
 * @returns {Promise<Object>} Созданный чат
 */
export const createChat = async data => {
  try {
    logger.info("Создание нового чата в БД", data)

    const [chat] = await db.insert(chats).values(data).returning()

    logger.info("Чат успешно создан в БД", {
      chatId: chat.id
    })

    return chat
  } catch (error) {
    logger.error("Ошибка при создании чата в БД", {
      error: error.message,
      data
    })

    throw error
  }
}

/**
 * Обновляет чат
 * @memberof Chat.Service
 * @param {number} chatId - ID чата
 * @param {Object} data - Данные для обновления
 * @returns {Promise<Object>} Обновленный чат
 */
export const updateChat = async (chatId, data) => {
  try {
    logger.info("Обновление чата в БД", {
      chatId,
      data
    })

    data.updatedAt = new Date()

    const [chat] = await db
      .update(chats)
      .set(data)
      .where(eq(chats.id, chatId))
      .returning()

    if (!chat) {
      throw new NotFoundError(`Чат с ID #${chatId} не найден`)
    }

    logger.info("Чат успешно обновлен в БД", {
      chatId
    })

    return chat
  } catch (error) {
    logger.error("Ошибка при обновлении чата в БД", {
      error: error.message,
      chatId
    })

    throw error
  }
}

/**
 * Удаляет чат
 * @memberof Chat.Service
 * @param {number} chatId - ID чата
 * @returns {Promise<Object>} Удаленный чат
 */
export const deleteChat = async chatId => {
  try {
    logger.info("Удаление чата из БД", {
      chatId
    })

    const chat = await db.delete(chats).where(eq(chats.id, chatId)).returning()

    if (chat.length === 0) {
      throw new NotFoundError(`Чат с ID #${chatId} не найден`)
    }

    logger.info("Чат успешно удален из БД", {
      chatId
    })

    return chat
  } catch (error) {
    logger.error("Ошибка при удалении чата из БД", {
      error: error.message,
      chatId
    })

    throw error
  }
}

/**
 * Отправляет сообщение в чат
 * @memberof MessagePair.Service
 * @param {number} chatId - ID чата
 * @param {string} content - Содержимое сообщения клиента
 * @returns {Promise<Object>} Созданная пара сообщений
 */
export const sendMessage = async (chatId, content) => {
  try {
    logger.info("Отправка сообщения в чат", {
      chatId,
      content
    })

    // Получаем чат по ID
    const chat = await getChatById(chatId)

    // Отправляем запрос к API
    const request = await sendRequest(chat.agent.alias, content)

    // Создаем сообщение клиента
    logger.info("Создание сообщения клиента")
    const [clientMessage] = await db
      .insert(clientMessages)
      .values({ content: request.clientMessage })
      .returning()

    // Создаем сообщение агента
    logger.info("Создание сообщения агента")
    const [agentMessage] = await db
      .insert(agentMessages)
      .values({ content: request.agentMessage })
      .returning()

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
      .set({ updatedAt: new Date() })
      .where(eq(chats.id, chatId))

    logger.info("Сообщение успешно отправлено в чат", {
      chatId: chatId,
      messagePairId: messagePair.id,
      requestId: request.id,
      clientMessageId: clientMessage.id,
      agentMessageId: agentMessage.id
    })

    return {
      id: messagePair.id,
      cost: request.cost,
      clientMessage,
      agentMessage
    }
  } catch (error) {
    logger.error("Ошибка при отправке сообщения в чат", {
      error: error.message,
      chatId
    })

    throw error
  }
}
