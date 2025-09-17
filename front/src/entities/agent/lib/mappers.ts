import type {
  AgentDTO,
  AgentListItemDTO,
  AgentCreateDTO,
  AgentUpdateDTO,
  AgentRuleDTO,
  AgentRuleCreateDTO,
  AgentRuleSortDTO
} from "./dto"
import type { Agent, AgentRule, AgentListItem } from "./schema"
import type { AgentCreateData, AgentRuleCreateData, AgentRuleSortData, AgentUpdateData } from "./types"
import { toProvider, toProviderListItem } from "@entities/provider"

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
  params: dto.params,
  description: dto.description,
  providerId: dto.providerId,
  provider: toProvider(dto.provider),
  rules: dto.rules.map(toAgentRule),
  isActive: dto.isActive,
  createdAt: new Date(dto.createdAt),
  updatedAt: new Date(dto.updatedAt)
})

/**
 * Маппер из DTO чата в сущность элемента списка чатов
 * @namespace Entities.Chat.Lib.Mappers.toChatListItem
 */
export const toAgentListItem = (dto: AgentListItemDTO): AgentListItem => {
  return {
    id: dto.id,
    name: dto.name,
    avatar: dto.avatar ? atob(dto.avatar) : "",
    params: dto.params,
    description: dto.description,
    providerId: dto.providerId,
    provider: toProviderListItem(dto.provider),
    isActive: dto.isActive,
    createdAt: new Date(dto.createdAt),
    updatedAt: new Date(dto.updatedAt)
  }
}

/**
 * Маппер из данных запроса в DTO создания агента
 * @namespace Entities.Agent.Model.toAgentCreateDTO
 */
export const toAgentCreateDTO = (data: AgentCreateData): AgentCreateDTO => {
  return {
    name: data.name,
    avatar: data.avatar ? btoa(data.avatar) : "",
    providerId: data.providerId,
    params: {}
  }
}

/**
 * Маппер из данных запроса в DTO обновления агента
 * @namespace Entities.Agent.Model.toAgentUpdateDTO
 */
export const toAgentUpdateDTO = (data: AgentUpdateData): AgentUpdateDTO => {
  const dto = {} as AgentUpdateDTO

  if (data.name !== undefined) dto.name = data.name
  // if (data.providerId !== undefined) dto.providerId = data.providerId
  if (data.params !== undefined) dto.params = data.params
  if (data.description !== undefined) dto.description = data.description

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
