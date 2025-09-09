import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  type RegisterProviderForm,
  type RegisterProviderFormPartial,
  registerProviderFormSchema
} from "../model/schema"

/**
 * Хук для формы регистрации провайдера
 * @namespace Features.Provider.RegisterProviderForm.Lib.Hooks.useRegisterProviderForm
 */
export const useRegisterProviderForm = (defaultValues?: RegisterProviderFormPartial) => {
  defaultValues = defaultValues || {}

  return useForm<RegisterProviderForm>({
    resolver: zodResolver(registerProviderFormSchema),
    defaultValues: {
      name: defaultValues.name ?? "",
      alias: defaultValues.alias ?? "",
      baseUrl: defaultValues.baseUrl ?? "",
      apiKey: defaultValues.apiKey ?? ""
    }
  })
}
