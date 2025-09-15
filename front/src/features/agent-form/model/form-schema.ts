import { z } from "zod"

/**
 * Схема для формы агента
 * @namespace Features.AgentForm.Model.agentFormSchema
 */
export const agentFormSchema = z.object({
  name: z.string().min(2, "Название должно содержать минимум 2 символа"),
  providerId: z.string().min(1, "Провайдер должен быть выбран"),
  avatar: z.string().optional()
})

/**
 * Тип для формы агента
 * @namespace Features.AgentForm.Model.AgentFormSchema
 */
export type AgentForm = z.infer<typeof agentFormSchema>
