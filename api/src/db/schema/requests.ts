import { pgTable, index, pgEnum } from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"
import { messagePairs } from "./messagePairs"
import { providers } from "./providers"

/**
 * Статус запроса
 * @namespace Db.Schema.RequestStatus
 */
export enum RequestStatus {
  COMPLETED = "COMPLETED",
  ERROR = "ERROR"
}

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
    providerRequestId: table.varchar("provider_request_id", { length: 255 }),
    status: table
      .varchar("status", { length: 20, enum: Object.values(RequestStatus) as [string, ...string[]] })
      .default(RequestStatus.COMPLETED)
      .notNull(),
    requestParams: table.json("request_params"),
    responseData: table.json("response_data"),
    requestTokens: table.integer("request_tokens"),
    responseTokens: table.integer("response_tokens"),
    createdAt: table.timestamp("created_at").notNull().defaultNow()
  }),
  table => [
    index("requests_status_idx").on(table.status),
    index("requests_request_tokens_idx").on(table.requestTokens),
    index("requests_response_tokens_idx").on(table.responseTokens),
    index("requests_provider_id_idx").on(table.providerId)
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
  messagePair: one(messagePairs, {
    fields: [requests.id],
    references: [messagePairs.requestId]
  })
}))
