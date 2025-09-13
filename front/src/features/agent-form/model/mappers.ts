import type { Agent, AgentCreateData, AgentUpdateData } from "@entities/agent/lib/types"
import type { AgentForm } from "./form-schema"

/**
 * Маппер из формы в DTO
 * @namespace Features.AgentForm.Model.Mappers.toAgentDTOForm
 */
export const toAgentDTOForm = (form: Agent): AgentForm => ({
  providerId: form.provider.id.toString(),
  params: JSON.stringify(form.params),
  name: form.name,
  avatar: form.avatar,
  description: form.description
})

/**
 * Маппер из формы в DTO (для создания агента)
 * @namespace Features.AgentForm.Model.Mappers.toAgentCreateDTO
 */
export const toAgentCreateDTO = (form: AgentForm): AgentCreateData => ({
  providerId: Number(form.providerId),
  name: form.name.trim(),
  avatar: form.avatar?.trim() ?? "",
  params: JSON.parse(form.params),
  description: form.description?.trim() ?? ""
})

/**
 * Маппер из формы в DTO (для обновления агента)
 * @namespace Features.AgentForm.Model.Mappers.toAgentUpdateDTO
 */
export const toAgentUpdateDTO = (form: AgentForm): AgentUpdateData => ({ ...toAgentCreateDTO(form) })
