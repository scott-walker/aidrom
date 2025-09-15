import { z } from "zod"

/**
 * Схема для формы параметров агента
 * @namespace Features.AgentParams.Model.agentParamsFormSchema
 */
export const agentParamsFormSchema = z.object({
  model: z.string().min(1, "Модель должна быть выбрана"),
  maxTokens: z.number().min(1, "Максимальное количество токенов должно быть больше 0"),
  topP: z.number().min(0.1, "Top P должно не меньше 0.1"),
  temperature: z.number().min(0, "Температура должна быть больше 0"),
  frequencyPenalty: z.number().min(-2, "Штраф за частоту должен быть больше -2"),
  presencePenalty: z.number().min(-2, "Штраф за присутствие должен быть больше -2")
})

/**
 * Тип для формы параметров агента
 * @namespace Features.AgentParams.Model.AgentParamsFormSchema
 */
export type AgentParamsForm = z.infer<typeof agentParamsFormSchema>
