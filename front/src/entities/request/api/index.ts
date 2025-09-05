import { restClient } from "@shared/api"
import type { RequestSchema } from "../lib/types"
import { toRequestSchema } from "../lib/mappers"

/**
 * Получить список запросов
 * @namespace Entities.Request.Api.getRequests
 */
export const getRequests = async (): Promise<RequestSchema[]> => {
  const { data } = await restClient.get("/requests")

  return data.map(toRequestSchema)
}

/**
 * Получить список запросов по ID провайдера
 * @namespace Entities.Request.Api.getRequestsByProviderId
 */
export const getRequestsByProviderId = async (providerId: number): Promise<RequestSchema[]> => {
  const { data } = await restClient.get(`/requests`, { params: { providerId } })

  return data.map(toRequestSchema)
}
