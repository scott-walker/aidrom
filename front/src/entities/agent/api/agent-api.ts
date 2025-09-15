import { restClient } from "@shared/api"
import type { Agent, AgentRule } from "../lib/schema"
import type { AgentCreateData, AgentRuleCreateData, AgentRuleSortData, AgentUpdateData } from "../lib/types"
import {
  toAgent,
  toAgentCreateDTO,
  toAgentUpdateDTO,
  toAgentRule,
  toAgentRuleCreateDTO,
  toAgentRuleSortDTO
} from "../lib/mappers"

/**
 * Создать агента
 * @namespace Entities.Agent.Api.createAgent
 */
export const createAgent = async (data: AgentCreateData): Promise<Agent> => {
  const { data: dto } = await restClient.post("agents", toAgentCreateDTO(data))

  return toAgent(dto)
}

/**
 * Обновить провайдера
 * @namespace Entities.Agent.Api.updateAgent
 */
export const updateAgent = async (agentId: number, data: AgentUpdateData): Promise<Agent> => {
  const { data: dto } = await restClient.put(`agents/${agentId}`, toAgentUpdateDTO(data))

  return toAgent(dto)
}

/**
 * Добавить правило агенту
 * @namespace Entities.Agent.Api.addAgentRule
 */
export const addAgentRule = async (agentId: number, data: AgentRuleCreateData): Promise<AgentRule> => {
  const { data: dto } = await restClient.post(`agents/${agentId}/rules`, toAgentRuleCreateDTO(data))

  return toAgentRule(dto)
}

/**
 * Удалить правило агента
 * @namespace Entities.Agent.Api.deleteAgentRule
 */
export const deleteAgentRule = async (agentId: number, ruleId: number): Promise<void> => {
  await restClient.delete(`agents/${agentId}/rules/${ruleId}`)
}

/**
 * Сортировать правила агента
 * @namespace Entities.Agent.Api.sortAgentRules
 */
export const sortAgentRules = async (agentId: number, data: AgentRuleSortData): Promise<void> => {
  await restClient.put(`agents/${agentId}/rules-sort`, toAgentRuleSortDTO(data))
}

/**
 * Получить список агентов
 * @namespace Entities.Agent.Api.fetchAgents
 */
export const fetchAgents = async (): Promise<Agent[]> => {
  const { data: dtos } = await restClient.get("agents")

  return dtos.map(toAgent)
}

/**
 * Получить агента по ID
 * @namespace Entities.Agent.Api.fetchAgentById
 */
export const fetchAgentById = async (id: number): Promise<Agent> => {
  const { data: dto } = await restClient.get(`agents/${id}`)

  return toAgent(dto)
}
