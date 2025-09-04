/**
 * Работа с БД
 * @namespace DB
 */

import { createConnection } from "./connection"

export const db = createConnection()
export * from "./schema"

// export {
//   // Драйверы
//   DriverSchema,
//   DriverWithProviders,

//   // Провайдеры
//   ProviderSchema,
//   ProviderWithRelations,

//   // Агенты
//   AgentSchema,
//   AgentWithRelations,

//   // Клиенты
//   ClientSchema,
//   ClientWithRelations,

//   // Чаты
//   ChatSchema,
//   ChatWithRelations,

//   // Пара сообщений
//   MessagePairSchema,
//   MessagePairWithRelations,

//   // Сообщения от клиента
//   ClientMessageSchema,
//   ClientMessageWithRelations,

//   // Сообщения от агента
//   AgentMessageSchema,
//   AgentMessageWithRelations,

//   // Запросы
//   RequestSchema,
//   RequestWithRelations
// } from "./types"
