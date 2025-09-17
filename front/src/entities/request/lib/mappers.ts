import type { RequestDTO } from "./dto"
import type { Request } from "./schema"
import { toProviderListItem } from "@entities/provider"

/**
 * Маппер из DTO в сущность
 * @namespace Entities.Request.Model.toRequest
 */
export const toRequest = (dto: RequestDTO): Request => ({
  id: dto.id,
  provider: toProviderListItem(dto.provider),
  providerRequestId: dto.providerRequestId,
  requestParams: dto.requestParams,
  responseData: dto.responseData,
  requestTokens: dto.requestTokens,
  responseTokens: dto.responseTokens,
  createdAt: new Date(dto.createdAt)
})
