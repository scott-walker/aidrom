import type { Agent } from "@entities/agent"
import type { AgentForm } from "./form-schema"

/**
 * Маппер из агента в форму
 * @namespace Features.AgentForm.Model.Mappers.toAgentForm
 */
export const toAgentForm = (agent: Partial<Agent>): AgentForm => ({
  providerId: agent.providerId?.toString() ?? "",
  name: agent.name ?? "",
  avatar: agent.avatar ?? ""
})

/**
 * Маппер из формы в агент
 * @namespace Features.AgentForm.Model.Mappers.toAgent
 */
export const toAgent = (form: AgentForm): Partial<Agent> => ({
  providerId: Number(form.providerId),
  name: form.name.trim(),
  avatar: form.avatar?.trim() ?? ""
})
