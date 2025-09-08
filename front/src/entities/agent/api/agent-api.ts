import { restClient } from "@shared/api"
import type { Agent } from "../lib/types"
import { toAgentCreateDTO, toAgentUpdateDTO, toAgentSchema } from "../lib/mappers"

/**
 * Создать агента
 * @namespace Entities.Agent.Api.createAgent
 */
export const createAgent = async (agent: Partial<Agent>) => {
  const { data } = await restClient.post("agents", toAgentCreateDTO(agent))

  return toAgentSchema(data)
}

/**
 * Обновить провайдера
 * @namespace Entities.Agent.Api.updateAgent
 */
export const updateAgent = async (agent: Partial<Agent>) => {
  const { data } = await restClient.put(`agents/${agent.id}`, toAgentUpdateDTO(agent))

  return toAgentSchema(data)
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
