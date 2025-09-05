import type { RequestDTO } from "../api/dto"
import type { RequestSchema } from "./types"

/**
 * Маппер из DTO в сущность
 * @namespace Entities.Request.Model.toRequestSchema
 */
export const toRequestSchema = (dto: RequestDTO): RequestSchema => ({
  id: dto.id,
  provider: dto.provider.name,
  providerRequestId: dto.providerRequestId,
  requestParams: dto.requestParams,
  responseData: dto.responseData,
  requestTokens: dto.requestTokens,
  responseTokens: dto.responseTokens,
  createdAt: dto.createdAt
})
