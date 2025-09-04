// api/src/db/schema/messagePairs.js
import { pgTable, index } from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"
import { chats } from "./chats"
import { requests } from "./requests"
import { clientMessages } from "./clientMessages"
import { agentMessages } from "./agentMessages"

// Пара сообщений - объединяет сообщение клиента и ответ агента
export const messagePairs = pgTable(
  "message_pairs",
  table => ({
    id: table.serial("id").primaryKey(),
    chatId: table
      .integer("chat_id")
      .notNull()
      .references(() => chats.id),
    requestId: table
      .integer("request_id")
      .notNull()
      .references(() => requests.id),
    clientMessageId: table
      .integer("client_message_id")
      .notNull()
      .references(() => clientMessages.id),
    agentMessageId: table
      .integer("agent_message_id")
      .notNull()
      .references(() => agentMessages.id),
    createdAt: table.timestamp("created_at").notNull().defaultNow(),
    updatedAt: table.timestamp("updated_at").notNull().defaultNow()
  }),
  table => [
    index("message_pairs_chat_idx").on(table.chatId),
    index("message_pairs_request_idx").on(table.requestId),
    index("message_pairs_client_message_idx").on(table.clientMessageId),
    index("message_pairs_agent_message_idx").on(table.agentMessageId)
  ]
)

// Определяем отношения
export const messagePairsRelations = relations(messagePairs, ({ one }) => ({
  chat: one(chats, {
    fields: [messagePairs.chatId],
    references: [chats.id]
  }),
  request: one(requests, {
    fields: [messagePairs.requestId],
    references: [requests.id]
  }),
  clientMessage: one(clientMessages, {
    fields: [messagePairs.clientMessageId],
    references: [clientMessages.id]
  }),
  agentMessage: one(agentMessages, {
    fields: [messagePairs.agentMessageId],
    references: [agentMessages.id]
  })
}))
