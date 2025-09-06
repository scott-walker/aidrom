import { restClient } from "@shared/api"
import type { RequestSchema } from "../lib/types"
import { toRequestSchema } from "../lib/mappers"

/**
 * Получить список запросов
 * @namespace Entities.Request.Api.fetchRequests
 */
export const fetchRequests = async (): Promise<RequestSchema[]> => {
  const { data } = await restClient.get("/requests")

  return data.map(toRequestSchema)
}

/**
 * Получить список запросов по ID провайдера
 * @namespace Entities.Request.Api.fetchRequestsByProviderId
 */
export const fetchRequestsByProviderId = async (providerId: number): Promise<RequestSchema[]> => {
  const { data } = await restClient.get(`/requests`, { params: { providerId } })

  return data.map(toRequestSchema)
}
