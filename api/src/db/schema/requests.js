import { pgTable, index } from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"
import { messagePairs } from "./messagePairs.js"
import { provider } from "./provider.js"

// Запросы к API
export const requests = pgTable(
  "requests",
  table => ({
    id: table.serial("id").primaryKey(),
    providerId: table
      .integer("provider_id")
      .notNull()
      .references(() => provider.id),
    providerRequestId: table.varchar("provider_request_id", { length: 255 }),
    clientParams: table.json("client_params"),
    clientMessage: table.text("client_message").notNull(),
    agentResponse: table.json("agent_response").notNull(),
    agentMessage: table.text("agent_message").notNull(),
    cost: table.doublePrecision("cost", { precision: 7, scale: 2 }).notNull().default(0.0),
    createdAt: table.timestamp("created_at").notNull().defaultNow()
  }),
  table => [index("requests_cost_idx").on(table.cost)]
)

export const requestsRelations = relations(requests, ({ one }) => ({
  provider: one(provider, {
    fields: [requests.providerId],
    references: [provider.id]
  }),
  messagePair: one(messagePairs, {
    fields: [requests.id],
    references: [messagePairs.requestId]
  })
}))
