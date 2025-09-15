import type { AgentResponseDTO, AgentRequestDTO, AgentRuleRequestDTO, AgentRuleResponseDTO } from "./dto"
import type { Agent, AgentCreateData, AgentParams, AgentRule, AgentRuleCreateData, AgentUpdateData } from "./types"

/**
 * Маппер из DTO в сущность
 * @namespace Entities.Agent.Model.toAgentSchema
 */
export const toAgentSchema = (dto: AgentResponseDTO): Agent => ({
  id: dto.id,
  name: dto.name,
  avatar: dto.avatar ? atob(dto.avatar) : "",
  params: {
    model: dto.params.model,
    maxTokens: dto.params.maxTokens,
    topP: dto.params.topP,
    temperature: dto.params.temperature,
    frequencyPenalty: dto.params.frequencyPenalty,
    presencePenalty: dto.params.presencePenalty
  },
  description: dto.description,
  provider: dto.provider,
  rules: dto.rules,
  isActive: dto.isActive,
  createdAt: dto.createdAt,
  updatedAt: dto.updatedAt
})

/**
 * Маппер из DTO в сущность (для правила агента)
 * @namespace Entities.Agent.Model.toAgentRuleSchema
 */
export const toAgentRuleSchema = (dto: AgentRuleResponseDTO): AgentRule => ({
  id: dto.id,
  content: dto.content,
  priority: dto.priority,
  agentId: dto.agentId
})

/**
 * Маппер из сущности в DTO (для создания агента)
 * @namespace Entities.Agent.Model.toAgentDTO
 */
export const toAgentCreateDTO = (data: AgentCreateData): AgentRequestDTO => {
  return {
    name: data.name,
    avatar: data.avatar ? btoa(data.avatar) : "",
    params: {
      model: "",
      maxTokens: 0,
      topP: 0,
      temperature: 0,
      frequencyPenalty: 0,
      presencePenalty: 0
    },
    description: data.description,
    providerId: data.providerId
  }
}

/**
 * Маппер из сущности в DTO (для обновления агента)
 * @namespace Entities.Agent.Model.toAgentUpdateDTO
 */
export const toAgentUpdateDTO = (agent: AgentUpdateData): AgentRequestDTO => {
  const data = {} as AgentRequestDTO

  if (agent.name) data.name = agent.name
  if (agent.avatar) data.avatar = agent.avatar ? btoa(agent.avatar) : ""
  if (agent.params) data.params = agent.params as AgentParams
  if (agent.description) data.description = agent.description
  if (agent.providerId) data.providerId = agent.providerId

  return data
}

/**
 * Маппер из сущности в DTO (для добавления правила агента)
 * @namespace Entities.Agent.Model.toAgentRuleCreateDTO
 */
export const toAgentRuleCreateDTO = (data: AgentRuleCreateData): AgentRuleRequestDTO => {
  return {
    content: data.content,
    priority: data.priority ?? 0
  }
}
