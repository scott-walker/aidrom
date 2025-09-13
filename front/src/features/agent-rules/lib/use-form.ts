import { useForm as useBaseForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { type AgentRulesForm, agentRulesFormSchema } from "../model/form-schema"

/**
 * Хук для формы агента правил
 * @namespace Features.AgentRules.Lib.useForm
 */
export const useForm = (defaultValues?: Partial<AgentRulesForm>) => {
  defaultValues = defaultValues || {}

  return useBaseForm<AgentRulesForm>({
    resolver: zodResolver(agentRulesFormSchema),
    defaultValues: {
      content: defaultValues.content ?? ""
    }
  })
}
