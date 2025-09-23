import type { DeleteRequestsDTO, RequestDTO } from "./dto"
import type { DeleteRequestsResponse, Request } from "./schema"
import { toProviderListItem } from "@entities/provider"

/**
 * Маппер из DTO в сущность
 * @namespace Entities.Request.Model.toRequest
 */
export const toRequest = (dto: RequestDTO): Request => ({
  id: dto.id,
  provider: toProviderListItem(dto.provider),
  providerRequestId: dto.providerRequestId,
  status: dto.status,
  requestParams: dto.requestParams,
  responseData: dto.responseData,
  requestTokens: dto.requestTokens,
  responseTokens: dto.responseTokens,
  createdAt: new Date(dto.createdAt)
})

/**
 * Маппер из DTO в сущность
 * @namespace Entities.Request.Model.toDeleteRequestsResponse
 */
export const toDeleteRequestsResponse = (dto: DeleteRequestsDTO): DeleteRequestsResponse => ({
  message: dto.message,
  count: dto.count
})
