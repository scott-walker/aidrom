import { pgTable, index } from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"
import { chats } from "./chats"
import { requests } from "./requests"

/**
 * Пара сообщений - объединяет сообщение клиента и ответ агента
 * @namespace Db.Schema.MessagePairs
 */
export const messagePairs = pgTable(
  "message_pairs",
  table => ({
    id: table.serial("id").primaryKey(),
    chatId: table
      .integer("chat_id")
      .notNull()
      .references(() => chats.id, { onDelete: "cascade" }),
    requestId: table.integer("request_id").references(() => requests.id, { onDelete: "set null" }),
    clientMessage: table.text("client_message").notNull(),
    agentMessage: table.text("agent_message"),
    createdAt: table.timestamp("created_at").notNull().defaultNow(),
    updatedAt: table.timestamp("updated_at").notNull().defaultNow()
  }),
  table => [index("message_pairs_chat_idx").on(table.chatId), index("message_pairs_request_idx").on(table.requestId)]
)

/**
 * Отношения пар сообщений
 * @namespace Db.Schema.MessagePairsRelations
 */
export const messagePairsRelations = relations(messagePairs, ({ one }) => ({
  chat: one(chats, {
    fields: [messagePairs.chatId],
    references: [chats.id]
  }),
  request: one(requests, {
    fields: [messagePairs.requestId],
    references: [requests.id]
  })
}))
