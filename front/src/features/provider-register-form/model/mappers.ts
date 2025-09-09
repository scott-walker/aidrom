import { type Provider } from "@entities/provider/lib/types"
import { type RegisterProviderForm } from "./schema"

// /**
//  * Маппер из DTO в форму
//  * @namespace Features.Provider.RegisterProviderForm.Model.Mappers.toRegisterProviderForm
//  */
// export const toRegisterProviderForm = (schema: ProviderSchema): RegisterProviderForm => ({
//   alias: schema.alias,
//   name: schema.name,
//   baseUrl: schema.baseUrl,
//   apiKey: schema.apiKey
// })

/**
 * Маппер из формы в DTO
 * @namespace Features.Provider.RegisterProviderForm.Model.Mappers.toRegisterProviderDTO
 */
export const toRegisterProviderSchema = (form: RegisterProviderForm): Partial<Provider> => ({
  id: form.id,
  driver: form.driver.trim(),
  name: form.name.trim(),
  description: form.description.trim(),
  config: form.config
})
