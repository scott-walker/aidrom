import type { RestError } from "@shared/api/rest-error"

/**
 * Схема запроса
 * @namespace Entities.Request.Model.RequestSchema
 */
export interface RequestSchema {
  id: number
  provider: string
  providerRequestId: string
  requestParams: Record<string, unknown>
  responseData: Record<string, unknown>
  requestTokens: number
  responseTokens: number
  createdAt: Date
}

/**
 * Тип для данных "запроса к провайдеру"
 * @namespace Entities.Request.Lib.RequestQueryData
 */
export type RequestQueryData = {
  request: RequestSchema | null
  isLoading: boolean
  error: RestError | null
}

/**
 * Тип для данных списка "запросов к провайдерам"
 * @namespace Entities.Request.Lib.RequestsQueryData
 */
export type RequestsQueryData = {
  requests: RequestSchema[]
  isLoading: boolean
  error: RestError | null
}
