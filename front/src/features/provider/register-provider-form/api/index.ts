import { createProvider } from "@entities/provider/api"
import { type ProviderSchema } from "@entities/provider/lib/types"
import { type RegisterProviderForm } from "../model/schema"
import { toRegisterProviderSchema } from "../model/mappers"

/**
 * Зарегистрировать провайдера
 * @namespace Features.Provider.RegisterProviderForm.Api.registerProvider
 */
export const registerProvider = async (form: RegisterProviderForm): Promise<ProviderSchema> => {
  const schema = toRegisterProviderSchema(form)
  const provider = await createProvider(schema)

  return provider
}
