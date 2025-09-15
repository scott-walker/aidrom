import type { Provider } from "@entities/provider"

/**
 * Агент
 * @namespace Entities.Agent.Lib.Schema.Agent
 */
export interface Agent {
  id: number
  name: string
  avatar: string
  params: AgentParams
  description: string
  provider: Provider
  rules: AgentRule[]
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

/**
 * Параметры агента
 * @namespace Entities.Agent.Lib.Schema.AgentParams
 */
export interface AgentParams {
  model: string
  maxTokens: number
  topP: number
  temperature: number
  frequencyPenalty: number
  presencePenalty: number
}

/**
 * Правило агента
 * @namespace Entities.Agent.Lib.Schema.AgentRule
 */
export interface AgentRule {
  id: number
  content: string
  priority: number
  agentId: number
}
