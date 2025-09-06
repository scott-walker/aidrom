import { z } from "zod"

/**
 * Схема для DTO агента
 * @namespace Entities.Agent.Model.AgentDTOSchema
 */
export const AgentDTOSchema = z.object({
  id: z.number(),
  name: z.string(),
  params: z.object({}),
  description: z.string(),
  providerId: z.number(),
  createdAt: z.date(),
  updatedAt: z.date()
})

/**
 * Тип для DTO агента (DTO запроса)
 * @namespace Entities.Agent.Model.AgentRequestDTO
 */
export type AgentRequestDTO = Omit<z.infer<typeof AgentDTOSchema>, "id">

/**
 * Тип для DTO агента (DTO ответа)
 * @namespace Entities.Agent.Model.AgentResponseDTO
 */
export type AgentResponseDTO = z.infer<typeof AgentDTOSchema>
