import { pgTable, unique } from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"
import { chats } from "./chats"

/**
 * Клиенты
 * @namespace Db.Schema.Clients
 */
export const clients = pgTable(
  "clients",
  table => ({
    id: table.serial("id").primaryKey(),
    email: table.varchar("email", { length: 255 }).notNull(),
    createdAt: table.timestamp("created_at").notNull().defaultNow(),
    updatedAt: table.timestamp("updated_at").notNull().defaultNow()
  }),
  table => [unique("clients_email_idx").on(table.email)]
)

/**
 * Отношения клиентов
 * @namespace Db.Schema.ClientsRelations
 */
export const clientsRelations = relations(clients, ({ many }) => ({
  chats: many(chats)
}))
