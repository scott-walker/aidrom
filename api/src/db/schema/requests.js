import { pgTable, serial, varchar, text, timestamp, json } from "drizzle-orm/pg-core"

export const requests = pgTable("requests", {
  id: serial("id").primaryKey(),
  model: varchar("model", { length: 255 }).notNull(),
  prompt: varchar("prompt", { length: 255 }).notNull(),
  content: text("content").notNull(),
  payload: json("payload").notNull(),
  response: json("response").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow()
})
