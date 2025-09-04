import { pgTable, unique } from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"
import { requests } from "./requests"

/**
 * Провайдеры
 * @namespace Db.Schema.Providers
 */
export const providers = pgTable(
  "providers",
  table => ({
    id: table.serial("id").primaryKey(),
    driver: table.varchar("driver", { length: 255 }).notNull(),
    config: table.json("config").notNull(),
    name: table.varchar("name", { length: 255 }).notNull(),
    description: table.text("description"),
    createdAt: table.timestamp("created_at").notNull().defaultNow(),
    updatedAt: table.timestamp("updated_at").notNull().defaultNow()
  }),
  table => [unique("providers_driver_idx").on(table.driver)]
)

/**
 * Отношения провайдеров
 * @namespace Db.Schema.ProvidersRelations
 */
export const providersRelations = relations(providers, ({ many }) => ({
  requests: many(requests)
}))
