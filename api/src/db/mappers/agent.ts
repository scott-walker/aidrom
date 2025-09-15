import { Agent, AgentParams } from "../types"

/**
 * Маппер для агента
 * @namespace Db.Mappers.AgentMapper
 */
export const mapAgent = (agent: Partial<Agent>): Agent => {
  const params: AgentParams = {
    model: agent.params.model ?? "",
    maxTokens: agent.params.maxTokens ?? 0,
    topP: agent.params.topP ?? 0,
    temperature: agent.params.temperature ?? 0,
    frequencyPenalty: agent.params.frequencyPenalty ?? 0,
    presencePenalty: agent.params.presencePenalty ?? 0
  }
  const provider = agent.provider ?? null
  const rules = agent.rules ?? []
  const isActive = !!agent.params.model

  return { ...agent, provider, params, rules, isActive } as Agent
}
