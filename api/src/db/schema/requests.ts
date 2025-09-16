import { pgTable, index } from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"
import { messagePairs } from "./messagePairs"
import { providers } from "./providers"
import { agents } from "./agents"
import { clients } from "./clients"

/**
 * Запросы к API
 * @namespace Db.Schema.Requests
 */
export const requests = pgTable(
  "requests",
  table => ({
    id: table.serial("id").primaryKey(),
    providerId: table
      .integer("provider_id")
      .notNull()
      .references(() => providers.id, { onDelete: "cascade" }),
    agentId: table
      .integer("agent_id")
      .notNull()
      .references(() => agents.id, { onDelete: "cascade" }),
    clientId: table
      .integer("client_id")
      .notNull()
      .references(() => clients.id, { onDelete: "cascade" }),
    providerRequestId: table.varchar("provider_request_id", { length: 255 }),
    requestParams: table.json("request_params"),
    responseData: table.json("response_data"),
    requestTokens: table.integer("request_tokens"),
    responseTokens: table.integer("response_tokens"),
    createdAt: table.timestamp("created_at").notNull().defaultNow()
  }),
  table => [
    index("requests_request_tokens_idx").on(table.requestTokens),
    index("requests_response_tokens_idx").on(table.responseTokens),
    index("requests_provider_id_idx").on(table.providerId),
    index("requests_agent_id_idx").on(table.agentId),
    index("requests_client_id_idx").on(table.clientId)
  ]
)

/**
 * Отношения запросов
 * @namespace Db.Schema.RequestsRelations
 */
export const requestsRelations = relations(requests, ({ one }) => ({
  provider: one(providers, {
    fields: [requests.providerId],
    references: [providers.id]
  }),
  agent: one(agents, {
    fields: [requests.agentId],
    references: [agents.id]
  }),
  client: one(clients, {
    fields: [requests.clientId],
    references: [clients.id]
  }),
  messagePair: one(messagePairs, {
    fields: [requests.id],
    references: [messagePairs.requestId]
  })
}))
