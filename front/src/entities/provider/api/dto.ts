import { z } from "zod"

/**
 * Схема для DTO провайдера
 * @namespace Entities.Provider.Model.ProviderDTOSchema
 */
export const ProviderDTOSchema = z.object({
  id: z.number(),
  alias: z.string(),
  name: z.string(),
  baseUrl: z.string(),
  apiKey: z.string()
})

/**
 * Тип для DTO провайдера (DTO запроса)
 * @namespace Entities.Provider.Model.ProviderRequestDTO
 */
export type ProviderRequestDTO = Omit<z.infer<typeof ProviderDTOSchema>, "id">

/**
 * Тип для DTO провайдера (DTO ответа)
 * @namespace Entities.Provider.Model.ProviderResponseDTO
 */
export type ProviderResponseDTO = z.infer<typeof ProviderDTOSchema>
