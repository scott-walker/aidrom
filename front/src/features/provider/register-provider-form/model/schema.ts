import { z } from "zod"

/**
 * Схема для формы регистрации провайдера
 * @namespace Features.Provider.RegisterProviderForm.Model.Schema
 */
export const registerProviderFormSchema = z.object({
  alias: z.string().min(2, "Алиас должен содержать минимум 2 символа"),
  name: z.string().min(2, "Название должно содержать минимум 2 символ"),
  baseUrl: z.url("URL должен быть валидным"),
  apiKey: z.string().min(8, "API ключ должно содержать минимум 8 символов")
})

/**
 * Тип для формы регистрации провайдера
 * @namespace Features.Provider.RegisterProviderForm.Model.Schema
 */
export type RegisterProviderForm = z.infer<typeof registerProviderFormSchema>
