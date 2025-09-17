import type { Provider } from "@entities/provider"
import type { ProviderConfigForm } from "./form-schema"

/**
 * Маппер из провайдера в данные формы
 * @namespace Features.ProviderForm.Model.providerFormMapper
 */
export const toProviderConfigForm = (provider: Partial<Provider>): ProviderConfigForm => {
  return {
    config: JSON.stringify(provider.config ?? {})
  }
}

/**
 * Маппер из данных формы в провайдера
 * @namespace Features.ProviderForm.Model.providerFormMapper
 */
export const toProvider = (form: ProviderConfigForm): Partial<Provider> => {
  return {
    config: JSON.parse(form.config)
  }
}
