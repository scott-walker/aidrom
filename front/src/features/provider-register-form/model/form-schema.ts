import { z } from "zod"

/**
 * Схема для формы регистрации провайдера
 * @namespace Features.Provider.RegisterProviderForm.Model.Schema
 */
export const registerProviderFormSchema = z.object({
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
 * Тип для формы регистрации провайдера
 * @namespace Features.Provider.RegisterProviderForm.Model.Schema
 */
export type RegisterProviderForm = z.infer<typeof registerProviderFormSchema>
