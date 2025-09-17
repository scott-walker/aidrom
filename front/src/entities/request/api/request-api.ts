import { restClient } from "@features/provider-form/model/api"
import type { Request } from "../lib/schema"
import { toRequest } from "../lib/mappers"

/**
 * Получить список запросов
 * @namespace Entities.Request.Api.fetchRequests
 */
export const fetchRequests = async (): Promise<Request[]> => {
  const { data: dtos } = await restClient.get("requests")

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
