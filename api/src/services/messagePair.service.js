/**
 * Сервис для работы с парами сообщений
 * @namespace MessagePair.Service
 */

import { eq, asc } from "drizzle-orm"
import { db } from "#db/index.js"
import { messagePairs } from "#db/schema/messagePairs.js"
import { clientMessages } from "#db/schema/clientMessages.js"
import { agentMessages } from "#db/schema/agentMessages.js"
import { chats } from "#db/schema/chats.js"
import { requests } from "#db/schema/requests.js"
import { complexSelectors } from "#db/selectors.js"
import { createServiceLogger } from "#utils/logger.js"
import { NotFoundError, ApiError } from "#utils/errors.js"
import { AgentResponse } from "#utils/api.js"
import clients from "#clients/index.js"

// Создаем логгер для сервиса пар сообщений
const logger = createServiceLogger("MessagePairService")

/**
 * Получает пары сообщений для чата
 * @memberof MessagePair.Service
 * @param {number} chatId - ID чата
 * @returns {Promise<Array<Object>>} Массив пар сообщений
 */
export const getMessagePairsByChatId = async chatId => {
  try {
    logger.info("Получение пар сообщений для чата", {
      chatId
    })

    const items = await db
      .select(complexSelectors.messagePairWithDetails)
      .from(messagePairs)
      .leftJoin(requests, eq(messagePairs.requestId, requests.id))
      .leftJoin(
        clientMessages,
        eq(messagePairs.clientMessageId, clientMessages.id)
      )
      .leftJoin(
        agentMessages,
        eq(messagePairs.agentMessageId, agentMessages.id)
      )
      .where(eq(messagePairs.chatId, chatId))
      .orderBy(asc(messagePairs.id))

    logger.info("Пары сообщений успешно получены", {
      chatId,
      count: items.length
    })

    return items
  } catch (error) {
    logger.error("Ошибка при получении пар сообщений", {
      error: error.message,
      chatId
    })

    throw error
  }
}

/**
 * Получает пару сообщений по ID
 * @memberof MessagePair.Service
 * @param {number} messagePairId - ID пары сообщений
 * @returns {Promise<Object>} Пара сообщений
 */
export const getMessagePairById = async messagePairId => {
  try {
    logger.info("Получение пары сообщений по ID", {
      messagePairId
    })

    const items = await db
      .select(complexSelectors.messagePairWithDetails)
      .from(messagePairs)
      .leftJoin(requests, eq(messagePairs.requestId, requests.id))
      .leftJoin(
        clientMessages,
        eq(messagePairs.clientMessageId, clientMessages.id)
      )
      .leftJoin(
        agentMessages,
        eq(messagePairs.agentMessageId, agentMessages.id)
      )
      .where(eq(messagePairs.id, messagePairId))

    const item = items[0] || null

    if (!item) {
      throw new NotFoundError(
        `Пара сообщений с ID #${messagePairId} не найдена`
      )
    }

    logger.info("Пара сообщений успешно найдена", {
      messagePairId
    })

    return item
  } catch (error) {
    logger.error("Ошибка при получении пары сообщений", {
      error: error.message,
      messagePairId
    })

    throw error
  }
}

/**
 * Обновляет пару сообщений
 * @memberof MessagePair.Service
 * @param {number} messagePairId - ID пары сообщений
 * @param {Object} updateData - Данные для обновления
 * @returns {Promise<Object>} Обновленная пара сообщений
 */
export const updateMessagePair = async (messagePairId, updateData) => {
  try {
    logger.info("Обновление пары сообщений", {
      messagePairId,
      updateData
    })

    const data = await db
      .update(messagePairs)
      .set({
        ...updateData,
        updatedAt: new Date()
      })
      .where(eq(messagePairs.id, messagePairId))
      .returning()

    const messagePair = data[0]

    if (!messagePair) {
      throw new NotFoundError(
        `Пара сообщений с ID #${messagePairId} не найдена`
      )
    }

    logger.info("Пара сообщений успешно обновлена", {
      messagePairId
    })

    return messagePair
  } catch (error) {
    logger.error("Ошибка при обновлении пары сообщений", {
      error: error.message,
      messagePairId
    })

    throw error
  }
}

/**
 * Удаляет пару сообщений
 * @memberof MessagePair.Service
 * @param {number} messagePairId - ID пары сообщений
 * @returns {Promise<void>}
 */
export const deleteMessagePair = async messagePairId => {
  try {
    logger.info("Удаление пары сообщений", {
      messagePairId
    })

    const data = await db
      .delete(messagePairs)
      .where(eq(messagePairs.id, messagePairId))
      .returning()

    if (data.length === 0) {
      throw new NotFoundError(
        `Пара сообщений с ID #${messagePairId} не найдена`
      )
    }

    logger.info("Пара сообщений успешно удалена", {
      messagePairId
    })
  } catch (error) {
    logger.error("Ошибка при удалении пары сообщений", {
      error: error.message,
      messagePairId
    })

    throw error
  }
}

/**
 * Переключает статус избранного для сообщения агента
 * @memberof MessagePair.Service
 * @param {number} messagePairId - ID пары сообщений
 * @returns {Promise<Object>} Обновленная пара сообщений
 */
export const toggleFavorite = async messagePairId => {
  try {
    logger.info("Переключение избранного для пары сообщений", {
      messagePairId
    })

    // Получаем текущее состояние избранного
    const currentPair = await db
      .select({
        agentMessageId: agentMessages.id,
        isFavorite: agentMessages.isFavorite
      })
      .from(messagePairs)
      .leftJoin(agentMessages, eq(messagePairs.id, agentMessages.messagePairId))
      .where(eq(messagePairs.id, messagePairId))

    if (currentPair.length === 0) {
      throw new NotFoundError(
        `Пара сообщений с ID #${messagePairId} не найдена`
      )
    }

    const agentMessageId = currentPair[0].agentMessageId
    const newFavoriteStatus = !currentPair[0].isFavorite

    // Обновляем статус избранного
    await db
      .update(agentMessages)
      .set({ isFavorite: newFavoriteStatus })
      .where(eq(agentMessages.id, agentMessageId))

    // Получаем обновленную пару сообщений
    const result = await getMessagePairById(messagePairId)

    logger.info("Избранное успешно переключено", {
      messagePairId,
      isFavorite: newFavoriteStatus
    })

    return result
  } catch (error) {
    logger.error("Ошибка при переключении избранного", {
      error: error.message,
      messagePairId
    })

    throw error
  }
}
