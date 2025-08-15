import { pgTable, index } from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"
import { agents } from "./agents.js"
import { clients } from "./clients.js"
import { messagePairs } from "./messagePairs.js"

// Чаты - диалог между клиентом и агентом
export const chats = pgTable(
  "chats",
  table => ({
    id: table.serial("id").primaryKey(),
    agentId: table
      .integer("agent_id")
      .notNull()
      .references(() => agents.id),
    clientId: table
      .integer("client_id")
      .notNull()
      .references(() => clients.id),
    title: table.varchar("title", { length: 255 }),
    createdAt: table.timestamp("created_at").notNull().defaultNow(),
    updatedAt: table.timestamp("updated_at").notNull().defaultNow()
  }),
  table => [
    index("chats_agent_id_idx").on(table.agentId),
    index("chats_client_id_idx").on(table.clientId)
  ]
)

// Определяем отношения
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
