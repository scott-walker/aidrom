import { pgTable, unique } from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"
import { chats } from "./chats.js"

// Клиенты - это пользователи, которые общаются с агентами
export const clients = pgTable(
  "clients",
  table => ({
    id: table.serial("id").primaryKey(),
    email: table.varchar("email", { length: 255 }).notNull(),
    balance: table.doublePrecision("balance", { precision: 10, scale: 2 }).notNull().default(0.0),
    createdAt: table.timestamp("created_at").notNull().defaultNow(),
    updatedAt: table.timestamp("updated_at").notNull().defaultNow()
  }),
  table => [unique("clients_email_idx").on(table.email)]
)

export const clientsRelations = relations(clients, ({ many }) => ({
  chats: many(chats)
}))
