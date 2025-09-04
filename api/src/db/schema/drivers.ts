import { pgTable, unique } from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"
import { providers } from "./providers"

export const drivers = pgTable(
  "drivers",
  table => ({
    id: table.serial("id").primaryKey(),
    alias: table.varchar("alias", { length: 255 }).notNull(),
    config: table.json("config").notNull(),
    description: table.text("description")
  }),
  table => [unique("drivers_alias_idx").on(table.alias)]
)

export const driversRelations = relations(drivers, ({ many }) => ({
  providers: many(providers)
}))
