import type {
  AgentCreateDTO,
  AgentDTO,
  AgentParamsDTO,
  AgentRuleCreateDTO,
  AgentRuleDTO,
  AgentRuleSortDTO,
  AgentUpdateDTO
} from "./dto"
import type { Agent, AgentParams, AgentRule } from "./schema"
import type { AgentCreateData, AgentRuleCreateData, AgentRuleSortData, AgentUpdateData } from "./types"

/**
 * Маппер из DTO в сущность "параметры агента"
 * @namespace Entities.Agent.Model.toAgentParams
 */
export const toAgentParams = (dto: AgentParamsDTO): AgentParams => ({
  model: dto.model,
  maxTokens: dto.maxTokens,
  topP: dto.topP,
  temperature: dto.temperature,
  frequencyPenalty: dto.frequencyPenalty,
  presencePenalty: dto.presencePenalty
})

/**
 * Маппер из данных запроса в DTO параметров агента
 * @namespace Entities.Agent.Model.toAgentParamsDTO
 */
export const toAgentParamsDTO = (data: AgentParams): AgentParamsDTO => ({
  model: data.model,
  maxTokens: data.maxTokens,
  topP: data.topP,
  temperature: data.temperature,
  frequencyPenalty: data.frequencyPenalty,
  presencePenalty: data.presencePenalty
})

/**
 * Маппер из DTO в сущность "правило агента"
 * @namespace Entities.Agent.Model.toAgentRule
 */
export const toAgentRule = (dto: AgentRuleDTO): AgentRule => ({
  id: dto.id,
  content: dto.content,
  priority: dto.priority,
  agentId: dto.agentId
})

/**
 * Маппер из DTO в сущность
 * @namespace Entities.Agent.Model.toAgent
 */
export const toAgent = (dto: AgentDTO): Agent => ({
  id: dto.id,
  name: dto.name,
  avatar: dto.avatar ? atob(dto.avatar) : "",
  params: toAgentParams(dto.params),
  description: dto.description,
  provider: dto.provider,
  rules: dto.rules.map(toAgentRule),
  isActive: dto.isActive,
  createdAt: new Date(dto.createdAt),
  updatedAt: new Date(dto.updatedAt)
})

/**
 * Маппер из данных запроса в DTO создания агента
 * @namespace Entities.Agent.Model.toAgentCreateDTO
 */
export const toAgentCreateDTO = (data: AgentCreateData): AgentCreateDTO => {
  return {
    name: data.name,
    avatar: data.avatar ? btoa(data.avatar) : "",
    providerId: data.providerId
  }
}

/**
 * Маппер из данных запроса в DTO обновления агента
 * @namespace Entities.Agent.Model.toAgentUpdateDTO
 */
export const toAgentUpdateDTO = (data: AgentUpdateData): AgentUpdateDTO => {
  const dto = {} as AgentUpdateDTO

  if (data.name) dto.name = data.name
  if (data.params) dto.params = toAgentParamsDTO(data.params)
  if (data.description) dto.description = data.description

  return dto
}

/**
 * Маппер из данных запроса в DTO создания правила агента
 * @namespace Entities.Agent.Model.toAgentRuleCreateDTO
 */
export const toAgentRuleCreateDTO = (data: AgentRuleCreateData): AgentRuleCreateDTO => {
  return {
    content: data.content
  }
}

/**
 * Маппер из данных запроса в DTO сортировки правил агента
 * @namespace Entities.Agent.Model.toAgentRuleSortDTO
 */
export const toAgentRuleSortDTO = (data: AgentRuleSortData): AgentRuleSortDTO => {
  return {
    ruleIds: data.ruleIds
  }
}
