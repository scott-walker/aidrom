import { useForm as useBaseForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { type AgentForm, agentFormSchema } from "../model/form-schema"

/**
 * Хук для формы агента
 * @namespace Features.AgentForm.Lib.useForm
 */
export const useForm = (defaultValues?: Partial<AgentForm>) => {
  defaultValues = defaultValues || {}

  return useBaseForm<AgentForm>({
    resolver: zodResolver(agentFormSchema),
    defaultValues: {
      providerId: defaultValues.providerId ?? undefined,
      name: defaultValues.name ?? "",
      avatar: defaultValues.avatar ?? ""
    }
  })
}
