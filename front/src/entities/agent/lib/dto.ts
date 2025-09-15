import { z } from "zod"

/**
 * Схема для DTO правила агента (DTO ответа)
 * @namespace Entities.Agent.Model.AgentRuleDTOSchema
 */
export const AgentRuleDTOSchema = z.object({
  id: z.number(),
  content: z.string(),
  priority: z.number(),
  agentId: z.number()
})

/**
 * Схема для DTO агента (DTO ответа)
 * @namespace Entities.Agent.Model.AgentDTOSchema
 */
export const AgentDTOResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  avatar: z.string(),
  params: z.object({}),
  description: z.string(),
  provider: z.object({
    id: z.number(),
    name: z.string()
  }),
  rules: z.array(AgentRuleDTOSchema),
  isActive: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date()
})

/**
 * Схема для DTO агента (DTO запроса)
 * @namespace Entities.Agent.Model.AgentDTORequestSchema
 */
export const AgentDTORequestSchema = z.object({
  name: z.string(),
  avatar: z.string(),
  params: z.object({
    model: z.string(),
    maxTokens: z.number(),
    topP: z.number(),
    temperature: z.number(),
    frequencyPenalty: z.number(),
    presencePenalty: z.number()
  }),
  description: z.string(),
  providerId: z.number()
})

/**
 * Схема для DTO правила агента (DTO запроса)
 * @namespace Entities.Agent.Model.AgentRuleRequestDTO
 */
export const AgentRuleRequestSchema = z.object({
  content: z.string(),
  priority: z.number()
})

/**
 * Тип для DTO агента (DTO ответа)
 * @namespace Entities.Agent.Model.AgentResponseDTO
 */
export type AgentResponseDTO = z.infer<typeof AgentDTOResponseSchema>

/**
 * Тип для DTO агента (DTO запроса)
 * @namespace Entities.Agent.Model.AgentRequestDTO
 */
export type AgentRequestDTO = z.infer<typeof AgentDTORequestSchema>

/**
 * Тип для DTO правила агента (DTO ответа)
 * @namespace Entities.Agent.Model.AgentRuleResponseDTO
 */
export type AgentRuleResponseDTO = z.infer<typeof AgentRuleDTOSchema>

/**
 * Тип для DTO правила агента (DTO запроса)
 * @namespace Entities.Agent.Model.AgentRuleRequestDTO
 */
export type AgentRuleRequestDTO = z.infer<typeof AgentRuleRequestSchema>
