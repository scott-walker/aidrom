import { pgTable, index } from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"
import { agents } from "./agents"

/**
 * Правила агента
 * @namespace Db.Schema.AgentRules
 */
export const agentRules = pgTable(
  "agent_rules",
  table => ({
    id: table.serial("id").primaryKey(),
    content: table.text("content").notNull(),
    priority: table.integer("priority").notNull().default(0),
    agentId: table
      .integer("agent_id")
      .notNull()
      .references(() => agents.id)
  }),
  table => [index("agent_rules_agent_id_idx").on(table.agentId), index("agent_rules_priority_idx").on(table.priority)]
)

/**
 * Отношения правил агента
 * @namespace Db.Schema.AgentRulesRelations
 */
export const agentRulesRelations = relations(agentRules, ({ one }) => ({
  agent: one(agents, {
    fields: [agentRules.agentId],
    references: [agents.id]
  })
}))
