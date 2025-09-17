import { Agent, AgentParams } from "../types"

/**
 * Маппер для агента
 * @namespace Db.Mappers.AgentMapper
 */
export const mapAgent = (agent: Partial<Agent>): Agent => {
  const params: AgentParams = agent.params ?? {}
  const provider = agent.provider ?? null
  const isActive = !!Object.keys(params).length

  return { ...agent, provider, params, isActive } as Agent
}
