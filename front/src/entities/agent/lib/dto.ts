import { z } from "zod"

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
  params: z.object({}),
  description: z.string(),
  providerId: z.number()
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
