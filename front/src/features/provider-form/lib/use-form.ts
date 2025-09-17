import { useForm as useBaseForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { type Provider } from "@entities/provider"
import { type ProviderForm, providerFormSchema } from "../model/form-schema"
import { toProviderForm } from "../model/mapper"

/**
 * Хук для формы провайдера
 * @namespace Features.ProviderForm.Lib.useForm
 */
export const useForm = (defaultValues?: Partial<Provider>) => {
  defaultValues = defaultValues || {}

  return useBaseForm<ProviderForm>({
    resolver: zodResolver(providerFormSchema),
    defaultValues: toProviderForm(defaultValues)
  })
}
