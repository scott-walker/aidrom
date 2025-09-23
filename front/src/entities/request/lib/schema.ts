import type { ProviderListItem } from "@entities/provider"

/**
 * Схема сущности "запрос к провайдеру"
 * @namespace Entities.Request.Lib.Schema.Request
 */
export interface Request {
  id: number
  provider: ProviderListItem
  providerRequestId: string
  status: string
  requestParams: Record<string, unknown>
  responseData: Record<string, unknown>
  requestTokens: number
  responseTokens: number
  createdAt: Date
}

/**
 * Схема ответа удаления запросов
 * @namespace Entities.Request.Lib.Schema.DeleteRequestsResponse
 */
export interface DeleteRequestsResponse {
  message: string
  count: number
}
