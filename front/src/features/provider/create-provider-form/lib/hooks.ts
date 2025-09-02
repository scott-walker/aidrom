import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { createProviderRules, type CreateProviderForm } from "../models/schema"

/**
 * Хук для формы создания провайдера
 * @namespace Features.Provider.CreateProviderForm.Lib.Hooks
 */
export const useCreateProviderForm = (defaultValues?: Partial<CreateProviderForm>) => {
  defaultValues = defaultValues || {}

  return useForm<CreateProviderForm>({
    resolver: zodResolver(createProviderRules),
    defaultValues: {
      name: defaultValues.name ?? "",
      alias: defaultValues.alias ?? "",
      baserUrl: defaultValues.baserUrl ?? "",
      apiKey: defaultValues.apiKey ?? ""
    }
  })
}
