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
 * Тип для данных запроса списка запросов к провайдерам
 * @namespace Entities.Request.Lib.RequestsQueryData
 */
export type RequestsQueryData = {
  requests: RequestSchema[]
  isLoading: boolean
  error: Error | null
}
