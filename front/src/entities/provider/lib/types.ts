import type { RestError } from "@features/provider-form/model/api"
import type { Provider } from "./schema"

/**
 * Тип данных для запроса списка провайдеров
 * @namespace Entities.Provider.Lib.Types.ProviderListQueryData
 */
export type ProviderListQueryData = {
  providers: Provider[]
  isLoading: boolean
  error: RestError | null
}

/**
 * Тип данных для запроса одного провайдера
 * @namespace Entities.Provider.Lib.Types.ProviderDetailQueryData
 */
export type ProviderDetailQueryData = {
  provider: Provider | null
  isLoading: boolean
  error: RestError | null
}

/**
 * Тип данных для запроса на создание провайдера
 * @namespace Entities.Provider.Lib.Types.ProviderCreateData
 */
export type ProviderCreateData = {
  driver: string
  name: string
  description: string
  config: Record<string, unknown>
}

/**
 * Тип данных для запроса на обновление провайдера
 * @namespace Entities.Provider.Lib.Types.ProviderUpdateData
 */
export type ProviderUpdateData = Partial<ProviderCreateData>
