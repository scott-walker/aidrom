/**
 * Утилиты для выборки полей без дублирования
 */

import { chats } from "#db/schema/chats.js"
import { messagePairs } from "#db/schema/messagePairs.js"
import { clientMessages } from "#db/schema/clientMessages.js"
import { agentMessages } from "#db/schema/agentMessages.js"
import { requests } from "#db/schema/requests.js"
import { agents } from "#db/schema/agents.js"
import { clients } from "#db/schema/clients.js"

// Предопределенные селекторы для каждой таблицы
export const selectors = {
  // Базовые поля для чатов
  chat: {
    id: chats.id,
    title: chats.title,
    createdAt: chats.createdAt,
    updatedAt: chats.updatedAt
  },

  // Базовые поля для агентов
  agent: {
    id: agents.id,
    alias: agents.alias,
    name: agents.name,
    description: agents.description,
    params: agents.params,
    createdAt: agents.createdAt,
    updatedAt: agents.updatedAt
  },

  // Базовые поля для клиентов
  client: {
    id: clients.id,
    email: clients.email,
    balance: clients.balance,
    createdAt: clients.createdAt,
    updatedAt: clients.updatedAt
  },

  // Базовые поля для пар сообщений
  messagePair: {
    id: messagePairs.id,
    createdAt: messagePairs.createdAt,
    updatedAt: messagePairs.updatedAt
  },

  // Базовые поля для сообщений клиента
  clientMessage: {
    id: clientMessages.id,
    content: clientMessages.content,
    createdAt: clientMessages.createdAt,
    updatedAt: clientMessages.updatedAt
  },

  // Базовые поля для сообщений агента
  agentMessage: {
    id: agentMessages.id,
    content: agentMessages.content,
    metadata: agentMessages.metadata,
    isFavorite: agentMessages.isFavorite,
    createdAt: agentMessages.createdAt,
    updatedAt: agentMessages.updatedAt
  },

  // Базовые поля для запросов
  request: {
    id: requests.id,
    prompt: requests.prompt,
    response: requests.response,
    metadata: requests.metadata,
    createdAt: requests.createdAt,
    updatedAt: requests.updatedAt
  }
}

// Функция для создания селектора с вложенными объектами
export const createNestedSelector = (baseSelector, nestedSelectors = {}) => {
  return {
    ...baseSelector,
    ...nestedSelectors
  }
}

// Готовые селекторы для сложных запросов
export const complexSelectors = {
  // Чат с агентом и клиентом
  chatWithRelations: createNestedSelector(selectors.chat, {
    agent: selectors.agent,
    client: selectors.client
  }),

  // Пара сообщений с полной информацией
  messagePairWithDetails: createNestedSelector(selectors.messagePair, {
    request: selectors.request,
    clientMessage: selectors.clientMessage,
    agentMessage: selectors.agentMessage
  }),

  // Чат с парами сообщений
  chatWithMessagePairs: createNestedSelector(selectors.chat, {
    agent: selectors.agent,
    client: selectors.client,
    messagePairs: selectors.messagePair
  })
}

// Утилита для создания селектора с пагинацией
export const createPaginatedSelector = (
  baseSelector,
  limit = 10,
  offset = 0
) => {
  return {
    ...baseSelector,
    _limit: limit,
    _offset: offset
  }
}
