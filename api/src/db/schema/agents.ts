import { pgTable, index } from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"
import { chats } from "./chats"
import { providers } from "./providers"
import { agentRules } from "./agentRules"

/**
 * Агенты
 * @namespace Db.Schema.Agents
 */
export const agents = pgTable(
  "agents",
  table => ({
    id: table.serial("id").primaryKey(),
    name: table.varchar("name", { length: 255 }).notNull(),
    avatar: table.text("avatar"),
    params: table.json("params").notNull(),
    description: table.text("description"),
    providerId: table
      .integer("provider_id")
      .notNull()
      .references(() => providers.id, { onDelete: "cascade" }),
    createdAt: table.timestamp("created_at").notNull().defaultNow(),
    updatedAt: table.timestamp("updated_at").notNull().defaultNow()
  }),
  table => [index("agents_provider_id_idx").on(table.providerId)]
)

/**
 * Отношения агентов
 * @namespace Db.Schema.AgentsRelations
 */
export const agentsRelations = relations(agents, ({ many, one }) => ({
  provider: one(providers, {
    fields: [agents.providerId],
    references: [providers.id]
  }),
  chats: many(chats),
  rules: many(agentRules)
}))
