import { z } from "zod"

/**
 * Форма создания провайдера
 * @namespace Features.Provider.CreateProviderForm.Models.CreateProviderRules
 */
export type CreateProviderForm = {
  name: string
  alias: string
  baserUrl: string
  apiKey: string
}

/**
 * Правила валидации формы создания провайдера
 * @namespace Features.Provider.CreateProviderForm.Models.CreateProviderRules
 */
export const createProviderRules = z.object({
  name: z.string().min(2, "Название обязательно для заполнения"),
  alias: z.string().min(2, "Системное имя обязательно для заполнения"),
  baserUrl: z.string().min(2, "Базовый API URL обязателен для заполнения"),
  apiKey: z.string().min(2, "API-ключ обязателен для заполнения")
})
