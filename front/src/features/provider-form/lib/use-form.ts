import { useForm as useBaseForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { type ProviderForm, providerFormSchema } from "../model/form-schema"

/**
 * Хук для формы провайдера
 * @namespace Features.ProviderForm.Lib.useForm
 */
export const useForm = (defaultValues?: Partial<ProviderForm>) => {
  defaultValues = defaultValues || {}

  return useBaseForm<ProviderForm>({
    resolver: zodResolver(providerFormSchema),
    defaultValues: {
      driver: defaultValues.driver ?? "",
      config: defaultValues.config ?? "{}",
      name: defaultValues.name ?? "",
      description: defaultValues.description ?? ""
    }
  })
}
