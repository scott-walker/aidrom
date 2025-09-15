import type { Provider } from "@entities/provider"

/**
 * Схема сущности "запрос к провайдеру"
 * @namespace Entities.Request.Lib.Schema.Request
 */
export interface Request {
  id: number
  provider: Provider
  providerRequestId: string
  requestParams: Record<string, unknown>
  responseData: Record<string, unknown>
  requestTokens: number
  responseTokens: number
  createdAt: Date
}
