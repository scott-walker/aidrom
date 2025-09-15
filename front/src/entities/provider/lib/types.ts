import type { Provider } from "./schema"

/**
 * Тип данных для запроса списка провайдеров
 * @namespace Entities.Provider.Lib.Types.ProviderListQueryData
 */
export type ProviderListQueryData = {
  providers: Provider[]
  isLoading: boolean
  error: Error | null
}

/**
 * Тип данных для запроса одного провайдера
 * @namespace Entities.Provider.Lib.Types.ProviderDetailQueryData
 */
export type ProviderDetailQueryData = {
  provider: Provider | undefined | null
  isLoading: boolean
  error: Error | null
}

/**
 * Тип данных для запроса на создание провайдера
 * @namespace Entities.Provider.Lib.Types.ProviderCreateData
 */
export type ProviderCreateData = {
  driver: string
  name: string
  description: string
  config: object
}

/**
 * Тип данных для запроса на обновление провайдера
 * @namespace Entities.Provider.Lib.Types.ProviderUpdateData
 */
export type ProviderUpdateData = {
  driver?: string
  name?: string
  description?: string
  config: object
}
