import type { Provider, ProviderListItem } from "@entities/provider"

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
  providerId: number
  provider: Provider
  rules: AgentRule[]
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

/**
 * Элемент списка агентов
 * @namespace Entities.Agent.Lib.Schema.AgentListItem
 */
export interface AgentListItem {
  id: number
  name: string
  avatar: string
  params: AgentParams
  description: string
  providerId: number
  provider: ProviderListItem
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

/**
 * Параметры агента
 * @namespace Entities.Agent.Lib.Schema.AgentParams
 */
export interface AgentParams {
  [key: string]: string | number | boolean
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
