import { restClient } from "@shared/api"
import type { Request, DeleteRequestsResponse } from "../lib/schema"
import { toRequest, toDeleteRequestsResponse } from "../lib/mappers"
import type { RequestsFilterData } from "../lib/dto"

/**
 * Получить список запросов
 * @namespace Entities.Request.Api.fetchRequests
 */
export const fetchRequests = async (params?: RequestsFilterData): Promise<Request[]> => {
  params = params ?? {}

  const { data: dtos } = await restClient.get("requests", { params })

  return dtos.map(toRequest)
}

/**
 * Получить список запросов по ID провайдера
 * @namespace Entities.Request.Api.fetchRequestsByProviderId
 */
export const fetchRequestsByProviderId = async (providerId: number): Promise<Request> => {
  const { data: dto } = await restClient.get(`requests/${providerId}`)

  return toRequest(dto)
}

/**
 * Удаление запросов
 * @namespace Entities.Request.Api.deleteRequests
 */
export const deleteRequests = async (params: RequestsFilterData): Promise<DeleteRequestsResponse> => {
  const { data: dto } = await restClient.delete("requests", { params })

  return toDeleteRequestsResponse(dto)
}

/**
 * Очистка битых запросов
 * @namespace Entities.Request.Api.clearBrokenRequests
 */
export const clearBrokenRequests = async (): Promise<void> => {
  await restClient.post("requests/clear-broken-requests")
}
