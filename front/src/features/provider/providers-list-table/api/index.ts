import { getProviders as getProvidersApi } from "@entities/provider/api"
import { type ProviderSchema } from "@entities/provider/lib/types"

/**
 * Получить список провайдеров
 * @namespace Features.Provider.ProvidersListTable.Api.getProviders
 */
export const getProviders = async (): Promise<ProviderSchema[]> => {
  const providers = await getProvidersApi()

  return providers
}
