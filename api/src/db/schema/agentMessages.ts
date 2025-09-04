import { pgTable, index } from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"
import { messagePairs } from "./messagePairs"

/**
 * Сообщения агента
 * @namespace Db.Schema.AgentMessages
 */
export const agentMessages = pgTable(
  "agent_messages",
  table => ({
    id: table.serial("id").primaryKey(),
    content: table.text("content").notNull(),
    isFavorite: table.boolean("is_favorite").notNull().default(false),
    createdAt: table.timestamp("created_at").notNull().defaultNow(),
    updatedAt: table.timestamp("updated_at").notNull().defaultNow()
  }),
  table => [index("agent_messages_is_favorite_idx").on(table.isFavorite)]
)

/**
 * Отношения сообщений агента
 * @namespace Db.Schema.AgentMessagesRelations
 */
export const agentMessagesRelations = relations(agentMessages, ({ one }) => ({
  messagePair: one(messagePairs, {
    fields: [agentMessages.id],
    references: [messagePairs.agentMessageId]
  })
}))
