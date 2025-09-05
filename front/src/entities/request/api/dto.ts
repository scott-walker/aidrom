import { z } from "zod"

/**
 * Схема для DTO запроса к провайдеру
 * @namespace Entities.Request.Model.RequestDTOSchema
 */
export const RequestDTOSchema = z.object({
  id: z.number(),
  provider: z.object({
    id: z.number(),
    name: z.string(),
    driver: z.string()
  }),
  providerRequestId: z.string(),
  requestParams: z.record(z.string(), z.any()),
  responseData: z.record(z.string(), z.any()),
  requestTokens: z.number(),
  responseTokens: z.number(),
  createdAt: z.date()
})

/**
 * Тип для DTO запроса к провайдеру
 * @namespace Entities.Request.Model.RequestDTO
 */
export type RequestDTO = z.infer<typeof RequestDTOSchema>
