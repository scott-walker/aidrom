import { z } from "zod"

/**
 * Схема для формы конфигурации провайдера
 * @namespace Features.ProviderConfig.Model.providerConfigFormSchema
 */
export const providerConfigFormSchema = z.object({
  config: z.string().refine(value => {
    try {
      JSON.parse(value)
      return true
    } catch {
      return false
    }
  }, "Конфигурация должна быть в формате JSON")
})

/**
 * Тип для формы конфигурации провайдера
 * @namespace Features.ProviderConfig.Model.ProviderConfigFormSchema
 */
export type ProviderConfigForm = z.infer<typeof providerConfigFormSchema>
