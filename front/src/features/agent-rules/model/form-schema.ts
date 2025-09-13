import { z } from "zod"

/**
 * Схема для формы агента правил
 * @namespace Features.AgentRules.Model.agentRulesFormSchema
 */
export const agentRulesFormSchema = z.object({
  content: z.string().min(2, "Содержание должно быть заполнено")
})

/**
 * Тип для формы агента правил
 * @namespace Features.AgentRules.Model.AgentRulesFormSchema
 */
export type AgentRulesForm = z.infer<typeof agentRulesFormSchema>
