import type { AgentResponseDTO, AgentRequestDTO } from "../api/dto"
import type { Agent } from "./types"

/**
 * Маппер из DTO в сущность
 * @namespace Entities.Agent.Model.toAgentSchema
 */
export const toAgentSchema = (dto: AgentResponseDTO): Agent => ({
  id: dto.id,
  name: dto.name,
  params: dto.params,
  description: dto.description,
  providerId: dto.providerId,
  createdAt: dto.createdAt,
  updatedAt: dto.updatedAt
})

/**
 * Маппер из сущности в DTO (для создания агента)
 * @namespace Entities.Agent.Model.toAgentDTO
 */
export const toAgentCreateDTO = (agent: Partial<Agent>): Partial<AgentRequestDTO> => {
  const data = {} as Partial<AgentRequestDTO>

  if (agent.name) data.name = agent.name
  if (agent.params) data.params = agent.params as Record<string, never>
  if (agent.description) data.description = agent.description
  if (agent.providerId) data.providerId = agent.providerId

  return data
}

/**
 * Маппер из сущности в DTO (для обновления агента)
 * @namespace Entities.Agent.Model.toAgentUpdateDTO
 */
export const toAgentUpdateDTO = (agent: Partial<Agent>): Partial<AgentRequestDTO> => {
  const data = {} as Partial<AgentRequestDTO>

  if (agent.name) data.name = agent.name
  if (agent.params) data.params = agent.params as Record<string, never>
  if (agent.description) data.description = agent.description

  return data
}
