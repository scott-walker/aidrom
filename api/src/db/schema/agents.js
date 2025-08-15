import { pgTable, unique } from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"
import { chats } from "./chats.js"

// Агенты - это боты, которые общаются с клиентами
export const agents = pgTable(
  "agents",
  table => ({
    id: table.serial("id").primaryKey(),
    alias: table.varchar("alias", { length: 255 }).notNull(),
    name: table.varchar("name", { length: 255 }).notNull(),
    description: table.text("description"),
    // network: varchar("network", { length: 255 }).notNull(),
    // model: varchar("model", { length: 255 }).notNull(),
    // systemPrompt: text("system_prompt"),
    params: table.json("params"),
    createdAt: table.timestamp("created_at").notNull().defaultNow(),
    updatedAt: table.timestamp("updated_at").notNull().defaultNow()
  }),
  table => [unique("agents_alias_idx").on(table.alias)]
)

export const agentsRelations = relations(agents, ({ many }) => ({
  chats: many(chats)
}))
