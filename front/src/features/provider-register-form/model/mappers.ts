import { type Provider } from "@entities/provider"
import { type RegisterProviderForm } from "./form-schema"

/**
 * Маппер из формы в DTO
 * @namespace Features.Provider.RegisterProviderForm.Model.Mappers.toRegisterProviderDTO
 */
export const toRegisterProviderSchema = (form: RegisterProviderForm): Partial<Provider> => ({
  driver: form.driver.trim(),
  name: form.name.trim(),
  description: form.description?.trim() ?? "",
  config: form.config.trim()
})
