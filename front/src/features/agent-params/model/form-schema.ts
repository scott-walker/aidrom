import { z } from "zod"

/**
 * Схема для формы параметров агента
 * @namespace Features.AgentParams.Model.agentParamsFormSchema
 */
export const agentParamsFormSchema = z.object({
  model: z.string().min(2, "Модель должна содержать минимум 2 символа"),
  maxTokens: z.number().min(1, "Максимальное количество токенов должно быть больше 0"),
  topP: z.number().min(0, "Top P должно быть больше 0"),
  temperature: z.number().min(0, "Температура должна быть больше 0"),
  frequencyPenalty: z.number().min(0, "Штраф за частоту должен быть больше 0"),
  presencePenalty: z.number().min(0, "Штраф за присутствие должен быть больше 0")
})

/**
 * Тип для формы параметров агента
 * @namespace Features.AgentParams.Model.AgentParamsFormSchema
 */
export type AgentParamsForm = z.infer<typeof agentParamsFormSchema>
