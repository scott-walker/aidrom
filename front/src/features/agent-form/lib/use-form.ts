import { useForm as useBaseForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { type Agent } from "@entities/agent"
import { type AgentForm, agentFormSchema } from "../model/form-schema"
import { toAgentForm } from "../model/mappers"

/**
 * Хук для формы агента
 * @namespace Features.AgentForm.Lib.useForm
 */
export const useForm = (defaultValues?: Partial<Agent>) => {
  defaultValues = defaultValues || {}

  return useBaseForm<AgentForm>({
    resolver: zodResolver(agentFormSchema),
    defaultValues: toAgentForm(defaultValues)
  })
}
