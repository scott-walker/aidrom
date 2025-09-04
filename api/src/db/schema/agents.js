import { pgTable, index } from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"
import { chats } from "./chats"
import { providers } from "./providers"

// Агенты - это боты, которые общаются с клиентами
export const agents = pgTable(
  "agents",
  table => ({
    id: table.serial("id").primaryKey(),
    name: table.varchar("name", { length: 255 }).notNull(),
    config: table.json("config").notNull(),
    description: table.text("description"),
    providerId: table
      .integer("provider_id")
      .notNull()
      .references(() => providers.id),
    createdAt: table.timestamp("created_at").notNull().defaultNow(),
    updatedAt: table.timestamp("updated_at").notNull().defaultNow()
  }),
  table => [index("agents_provider_id_idx").on(table.providerId)]
)

export const agentsRelations = relations(agents, ({ many, one }) => ({
  provider: one(providers, {
    fields: [agents.providerId],
    references: [providers.id]
  }),
  chats: many(chats)
}))
