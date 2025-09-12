import { z } from "zod"

/**
 * Схема для формы провайдера
 * @namespace Features.ProviderForm.Model.providerFormSchema
 */
export const providerFormSchema = z.object({
  driver: z.string().min(2, "Драйвер должен содержать минимум 2 символа"),
  config: z.string().refine(value => {
    try {
      JSON.parse(value)
      return true
    } catch {
      return false
    }
  }, "Конфигурация должна быть в формате JSON"),
  name: z.string().min(2, "Название должно содержать минимум 2 символ"),
  description: z.string().optional()
})

/**
 * Тип для формы провайдера
 * @namespace Features.ProviderForm.Model.ProviderFormSchema
 */
export type ProviderForm = z.infer<typeof providerFormSchema>
