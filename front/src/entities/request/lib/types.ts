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
