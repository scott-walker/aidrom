import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { type RegisterProviderForm, registerProviderFormSchema } from "../model/form-schema"

/**
 * Хук для формы регистрации
 * @namespace Features.Provider.RegisterProviderForm.Lib.useRegisterForm
 */
export const useRegisterForm = (defaultValues?: Partial<RegisterProviderForm>) => {
  defaultValues = defaultValues || {}

  return useForm<RegisterProviderForm>({
    resolver: zodResolver(registerProviderFormSchema),
    defaultValues: {
      driver: defaultValues.driver ?? "",
      config: defaultValues.config ?? "{}",
      name: defaultValues.name ?? "",
      description: defaultValues.description ?? ""
    }
  })
}
