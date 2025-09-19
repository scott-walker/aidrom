import { pgTable, index } from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"
import { agents } from "./agents"
import { clients } from "./clients"
import { messagePairs } from "./messagePairs"

/**
 * Чаты
 * @namespace Db.Schema.Chats
 */
export const chats = pgTable(
  "chats",
  table => ({
    id: table.serial("id").primaryKey(),
    agentId: table
      .integer("agent_id")
      .notNull()
      .references(() => agents.id, { onDelete: "cascade" }),
    clientId: table
      .integer("client_id")
      .notNull()
      .references(() => clients.id, { onDelete: "cascade" }),
    title: table.varchar("title", { length: 255 }),
    context: table.json("context").notNull().default([]),
    createdAt: table.timestamp("created_at").notNull().defaultNow(),
    updatedAt: table.timestamp("updated_at").notNull().defaultNow()
  }),
  table => [index("chats_agent_id_idx").on(table.agentId), index("chats_client_id_idx").on(table.clientId)]
)

/**
 * Отношения чатов
 * @namespace Db.Schema.ChatsRelations
 */
export const chatsRelations = relations(chats, ({ one, many }) => ({
  agent: one(agents, {
    fields: [chats.agentId],
    references: [agents.id]
  }),
  client: one(clients, {
    fields: [chats.clientId],
    references: [clients.id]
  }),
  messagePairs: many(messagePairs)
}))
