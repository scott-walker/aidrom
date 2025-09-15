import type { Provider } from "@entities/provider"
import type { ProviderForm } from "./form-schema"

/**
 * Маппер из провайдера в данные формы
 * @namespace Features.ProviderForm.Model.providerFormMapper
 */
export const toProviderForm = (provider: Partial<Provider>): ProviderForm => {
  return {
    driver: provider.driver ?? "",
    config: JSON.stringify(provider.config ?? {}),
    name: provider.name ?? "",
    description: provider.description ?? ""
  }
}

/**
 * Маппер из данных формы в провайдера
 * @namespace Features.ProviderForm.Model.providerFormMapper
 */
export const toProvider = (form: ProviderForm): Partial<Provider> => {
  return {
    driver: form.driver,
    config: JSON.parse(form.config),
    name: form.name,
    description: form.description ?? ""
  }
}
