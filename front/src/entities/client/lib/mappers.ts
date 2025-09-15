import type { ClientDTO } from "./dto"
import type { Client } from "./schema"

/**
 * Маппер из DTO в сущность клиента
 * @namespace Entities.Client.Lib.Mappers.toClient
 */
export const toClient = (dto: ClientDTO): Client => {
  return {
    id: dto.id,
    email: dto.email,
    createdAt: new Date(dto.createdAt),
    updatedAt: new Date(dto.updatedAt)
  }
}
