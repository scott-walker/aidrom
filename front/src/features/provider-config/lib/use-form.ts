import { useForm as useBaseForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import type { Provider } from "@entities/provider"
import { providerConfigFormSchema, type ProviderConfigForm } from "../model/form-schema"
import { toProviderConfigForm } from "../model/mapper"

/**
 * Хук для формы провайдера
 * @namespace Features.ProviderForm.Lib.useForm
 */
export const useForm = (defaultValues?: Partial<Provider>) => {
  defaultValues = defaultValues || {}

  return useBaseForm<ProviderConfigForm>({
    resolver: zodResolver(providerConfigFormSchema),
    defaultValues: toProviderConfigForm(defaultValues)
  })
}
