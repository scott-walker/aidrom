import { restClient } from "@shared/api"
import type { Agent, AgentCreateData, AgentRule, AgentRuleCreateData, AgentUpdateData } from "../lib/types"
import {
  toAgentSchema,
  toAgentCreateDTO,
  toAgentUpdateDTO,
  toAgentRuleSchema,
  toAgentRuleCreateDTO
} from "../lib/mappers"

/**
 * Создать агента
 * @namespace Entities.Agent.Api.createAgent
 */
export const createAgent = async (agent: AgentCreateData): Promise<Agent> => {
  const { data } = await restClient.post("agents", toAgentCreateDTO(agent))

  return toAgentSchema(data)
}

/**
 * Обновить провайдера
 * @namespace Entities.Agent.Api.updateAgent
 */
export const updateAgent = async (agentId: number, agent: AgentUpdateData): Promise<Agent> => {
  const { data } = await restClient.put(`agents/${agentId}`, toAgentUpdateDTO(agent))

  return toAgentSchema(data)
}

/**
 * Добавить правило агенту
 * @namespace Entities.Agent.Api.addAgentRule
 */
export const addAgentRule = async (agentId: number, rule: AgentRuleCreateData): Promise<AgentRule> => {
  const { data } = await restClient.post(`agents/${agentId}/rules`, toAgentRuleCreateDTO(rule))

  return toAgentRuleSchema(data)
}

/**
 * Удалить правило агента
 * @namespace Entities.Agent.Api.deleteAgentRule
 */
export const deleteAgentRule = async (ruleId: number): Promise<AgentRule> => {
  const { data } = await restClient.delete(`agents/rules/${ruleId}`)

  return toAgentRuleSchema(data)
}

/**
 * Получить список агентов
 * @namespace Entities.Agent.Api.fetchAgents
 */
export const fetchAgents = async (): Promise<Agent[]> => {
  const { data } = await restClient.get("agents")

  return data.map(toAgentSchema)
}

/**
 * Получить агента по ID
 * @namespace Entities.Agent.Api.fetchAgentById
 */
export const fetchAgentById = async (id: number): Promise<Agent> => {
  const { data } = await restClient.get(`agents/${id}`)

  return toAgentSchema(data)
}
