import { pgTable, index } from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"
import { messagePairs } from "./messagePairs"

/**
 * Сообщения клиента
 * @namespace Db.Schema.ClientMessages
 */
export const clientMessages = pgTable(
  "client_messages",
  table => ({
    id: table.serial("id").primaryKey(),
    content: table.text("content").notNull(),
    createdAt: table.timestamp("created_at").notNull().defaultNow(),
    updatedAt: table.timestamp("updated_at").notNull().defaultNow()
  }),
  table => [index("client_messages_created_at_idx").on(table.createdAt)]
)

/**
 * Отношения сообщений клиента
 * @namespace Db.Schema.ClientMessagesRelations
 */
export const clientMessagesRelations = relations(clientMessages, ({ one }) => ({
  messagePair: one(messagePairs, {
    fields: [clientMessages.id],
    references: [messagePairs.clientMessageId]
  })
}))
