import { pgTable, index } from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"
import { requests } from "./requests"
import { drivers } from "./drivers"

// Провайдеры - компании, которые предоставляют услуги API
export const providers = pgTable(
  "providers",
  table => ({
    id: table.serial("id").primaryKey(),
    name: table.varchar("name", { length: 255 }).notNull(),
    description: table.text("description"),
    config: table.json("config").notNull(),
    driverId: table
      .integer("driver_id")
      .notNull()
      .references(() => drivers.id),
    createdAt: table.timestamp("created_at").notNull().defaultNow(),
    updatedAt: table.timestamp("updated_at").notNull().defaultNow()
  }),
  table => [index("providers_driver_id_idx").on(table.driverId)]
)

// Определяем отношения
export const providersRelations = relations(providers, ({ one, many }) => ({
  driver: one(drivers, {
    fields: [providers.driverId],
    references: [drivers.id]
  }),
  requests: many(requests)
}))
