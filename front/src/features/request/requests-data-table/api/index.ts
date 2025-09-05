import { getRequests as getRequestsApi } from "@entities/request/api"
import type { RequestSchema } from "@entities/request/lib/types"

/**
 * Получить список запросов
 * @namespace Features.Request.RequestsDataTable.Api.getRequests
 */
export const getRequests = async (): Promise<RequestSchema[]> => {
  const requests = await getRequestsApi()

  return requests
}
