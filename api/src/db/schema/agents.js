import { pgTable, unique, index } from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"
import { chats } from "./chats.js"
import { providers } from "./providers.js"

// Агенты - это боты, которые общаются с клиентами
export const agents = pgTable(
  "agents",
  table => ({
    id: table.serial("id").primaryKey(),
    alias: table.varchar("alias", { length: 255 }).notNull(),
    name: table.varchar("name", { length: 255 }).notNull(),
    description: table.text("description"),
    // model: varchar("model", { length: 255 }).notNull(),
    // systemPrompt: text("system_prompt"),
    params: table.json("params"),
    providerId: table
      .integer("provider_id")
      .notNull()
      .references(() => providers.id),
    createdAt: table.timestamp("created_at").notNull().defaultNow(),
    updatedAt: table.timestamp("updated_at").notNull().defaultNow()
  }),
  table => [unique("agents_alias_idx").on(table.alias), index("agents_provider_id_idx").on(table.providerId)]
)

export const agentsRelations = relations(agents, ({ many, one }) => ({
  provider: one(providers, {
    fields: [agents.providerId],
    references: [providers.id]
  }),
  chats: many(chats)
}))
