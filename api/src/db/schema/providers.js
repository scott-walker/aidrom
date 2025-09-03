import { pgTable, unique } from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"
import { requests } from "./requests.js"

// Провайдеры - компании, которые предоставляют услуги API
export const providers = pgTable(
  "providers",
  table => ({
    id: table.serial("id").primaryKey(),
    alias: table.varchar("alias", { length: 255 }).notNull(),
    name: table.varchar("name", { length: 255 }).notNull(),
    baseUrl: table.varchar("base_url", { length: 255 }).notNull(),
    apiKey: table.varchar("api_key", { length: 255 }).notNull(),
    createdAt: table.timestamp("created_at").notNull().defaultNow(),
    updatedAt: table.timestamp("updated_at").notNull().defaultNow()
  }),
  table => [unique("providers_alias_idx").on(table.alias)]
)

// Определяем отношения
export const providersRelations = relations(providers, ({ one, many }) => ({
  requests: many(requests)
}))
