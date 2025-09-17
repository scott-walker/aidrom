import type { ProviderDTO, ProviderListItemDTO } from "@entities/provider/lib/dto"

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
 * DTO элемента списка агентов
 * @namespace Entities.Agent.Model.AgentListItemDTO
 */
export interface AgentListItemDTO {
  id: number
  name: string
  avatar: string
  params: AgentParamsDTO
  description: string
  provider: ProviderListItemDTO
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
  [key: string]: string | number | boolean
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
  params: AgentParamsDTO
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
