/**
 * Работа с БД
 * @namespace DB
 */

import { createConnection } from "./connection"

export const db = createConnection()
export * from "./schema"
export * from "./mappers"

export type {
  // Провайдеры
  Provider,
  ProviderWithDriver,
  CreateProviderData,
  UpdateProviderData,

  // Агенты
  Agent,
  AgentParams,
  CreateAgentData,
  UpdateAgentData,
  AgentRule,
  CreateAgentRuleData,

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
  Request,
  RequestWithProvider,
  RequestWithResponseContent,
  CreateRequestData
} from "./types"
