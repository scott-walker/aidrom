/**
 * Работа с БД
 * @namespace DB
 */

import { createConnection } from "./connection"

export const db = createConnection()
export * from "./schema"

export type {
  // Драйверы
  Driver,
  CreateDriverData,
  UpdateDriverData,

  // Провайдеры
  Provider,
  CreateProviderData,
  UpdateProviderData,

  // Агенты
  Agent,
  CreateAgentData,
  UpdateAgentData,

  // Клиенты
  Client,
  CreateClientData,
  UpdateClientData,

  // Чаты
  Chat,
  CreateChatData,
  UpdateChatData,
  ChatWithRelations,
  ClientMessage,
  AgentMessage,
  MessagePair,

  // Запросы
  Request
} from "./types"
