import { zodResolver } from "@hookform/resolvers/zod"
import { useForm as useBaseForm } from "react-hook-form"
import { type AgentParams } from "@entities/agent"
import { agentParamsFormSchema } from "../model/form-schema"

/**
 * Хук для формы параметров агента
 * @namespace Features.AgentParams.Lib.useForm
 */
export const useForm = (defaultValues: AgentParams) => {
  return useBaseForm<AgentParams>({
    resolver: zodResolver(agentParamsFormSchema),
    defaultValues: {
      model: defaultValues.model ?? "",
      maxTokens: defaultValues.maxTokens ?? 0,
      topP: defaultValues.topP ?? 0,
      temperature: defaultValues.temperature ?? 0,
      frequencyPenalty: defaultValues.frequencyPenalty ?? 0,
      presencePenalty: defaultValues.presencePenalty ?? 0
    }
  })
}
