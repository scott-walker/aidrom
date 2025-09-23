import type { ProviderDTO } from "@entities/provider"

/**
 * DTO запроса к провайдеру
 * @namespace Entities.Request.Model.RequestDTO
 */
export interface RequestDTO {
  id: number
  provider: ProviderDTO
  providerRequestId: string
  requestParams: Record<string, unknown>
  responseData: Record<string, unknown>
  requestTokens: number
  responseTokens: number
  createdAt: string
}

/**
 * Параметры фильтрации
 * @namespace Entities.Request.Model.RequestsFilterData
 */
export interface RequestsFilterData {
  providerId?: string | null
  searchById?: string | null
  sortField?: string | null
  sortOrder?: string | null
  limit?: number | null
}
