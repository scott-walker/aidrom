import type { ProviderDTO } from "@entities/provider"

/**
 * DTO агента
 * @namespace Entities.Agent.Model.AgentDTO
 */
export interface AgentDTO {
  id: number
  name: string
  avatar: string
  params: AgentParamsDTO
  description: string
  provider: ProviderDTO
  rules: AgentRuleDTO[]
  isActive: boolean
  createdAt: string
  updatedAt: string
}

/**
 * DTO параметров агента
 * @namespace Entities.Agent.Model.AgentParamsDTO
 */
export interface AgentParamsDTO {
  model: string
  maxTokens: number
  topP: number
  temperature: number
  frequencyPenalty: number
  presencePenalty: number
}

/**
 * DTO правила агента
 * @namespace Entities.Agent.Model.AgentRuleDTO
 */
export interface AgentRuleDTO {
  id: number
  content: string
  priority: number
  agentId: number
}

/**
 * DTO создания агента
 * @namespace Entities.Agent.Model.AgentCreateDTO
 */
export interface AgentCreateDTO {
  name: string
  avatar: string
  providerId: number
}

/**
 * DTO обновления агента
 * @namespace Entities.Agent.Model.AgentUpdateDTO
 */
export interface AgentUpdateDTO {
  name?: string
  params?: AgentParamsDTO
  description?: string
}

/**
 * DTO создания правила агента
 * @namespace Entities.Agent.Model.AgentRuleCreateDTO
 */
export interface AgentRuleCreateDTO {
  content: string
}

/**
 * DTO сортировки правил агента
 * @namespace Entities.Agent.Model.AgentRuleSortDTO
 */
export interface AgentRuleSortDTO {
  ruleIds: number[]
}
