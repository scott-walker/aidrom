import { z } from "zod"

/**
 * Схема для DTO конфигурации параметров драйвера
 * @namespace Entities.Provider.Model.DriverRequestParamsConfigDTOSchema
 */
export const ProviderParamsConfigDTOSchema = z.object({
  model: z.array(z.string()),
  maxTokens: z.object({ min: z.number(), max: z.number() }),
  topP: z.object({ min: z.number(), max: z.number() }),
  temperature: z.object({ min: z.number(), max: z.number() }),
  frequencyPenalty: z.object({ min: z.number(), max: z.number() }),
  presencePenalty: z.object({ min: z.number(), max: z.number() })
})

/**
 * Схема для DTO провайдера
 * @namespace Entities.Provider.Model.ProviderDTOSchema
 */
export const ProviderDTOSchema = z.object({
  id: z.number(),
  driver: z.string(),
  name: z.string(),
  description: z.string(),
  config: z.object({})
})

/**
 * Схема для DTO провайдера с конфигурацией параметров драйвера
 * @namespace Entities.Provider.Model.ProviderWithDriverParamsConfigDTOSchema
 */
export const ProviderWithDriverParamsConfigDTOSchema = z.object({
  id: z.number(),
  driver: z.string(),
  name: z.string(),
  description: z.string(),
  config: z.object({}),
  driverParamsConfig: ProviderParamsConfigDTOSchema
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

/**
 * Тип для DTO провайдера с конфигурацией параметров драйвера (DTO ответа)
 * @namespace Entities.Provider.Model.ProviderWithDriverParamsConfigDTOSchema
 */
export type ProviderWithDriverParamsConfigDTOSchema = z.infer<typeof ProviderWithDriverParamsConfigDTOSchema>
