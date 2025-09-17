import type { RestError } from "@features/provider-form/model/api"
import type { Request } from "./schema"

/**
 * Тип для данных списка "запросов к провайдерам"
 * @namespace Entities.Request.Lib.RequestListQueryData
 */
export type RequestListQueryData = {
  requests: Request[]
  isLoading: boolean
  error: RestError | null
}

/**
 * Тип для данных "запроса к провайдеру"
 * @namespace Entities.Request.Lib.RequestDetailQueryData
 */
export type RequestDetailQueryData = {
  request: Request | null
  isLoading: boolean
  error: RestError | null
}
