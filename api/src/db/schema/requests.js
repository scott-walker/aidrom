import { pgTable, index } from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"
import { messagePairs } from "./messagePairs.js"

// Запросы к API
export const requests = pgTable(
  "requests",
  table => ({
    id: table.serial("id").primaryKey(),
    network: table.varchar("network", { length: 255 }).notNull(),
    model: table.varchar("model", { length: 255 }).notNull(),
    cost: table
      .doublePrecision("cost", { precision: 7, scale: 2 })
      .notNull()
      .default(0.0),
    clientParams: table.json("client_params").notNull(),
    clientContent: table.text("client_content").notNull(),
    agentRequestId: table
      .varchar("agent_request_id", { length: 255 })
      .notNull(),
    agentMetadata: table.json("agent_metadata").notNull(),
    agentContent: table.text("agent_content").notNull(),
    createdAt: table.timestamp("created_at").notNull().defaultNow()
  }),
  table => [index("requests_cost_idx").on(table.cost)]
)

export const requestsRelations = relations(requests, ({ one }) => ({
  messagePair: one(messagePairs, {
    fields: [requests.id],
    references: [messagePairs.requestId]
  })
}))
