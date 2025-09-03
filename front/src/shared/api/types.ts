import type { AxiosInstance } from "axios"

/**
 * Конфиг для REST клиента
 * @namespace Shared.Api.ApiClientConfig
 */
export type RestClientConfig = {
  baseURL: string
}

/**
 * Тип REST клиента
 * @namespace Shared.Api.RestClient
 */
export type RestClient = {
  get: AxiosInstance["get"]
  post: AxiosInstance["post"]
  put: AxiosInstance["put"]
  delete: AxiosInstance["delete"]
  patch: AxiosInstance["patch"]
}

// /**
//  * Тип ответа API клиента
//  * @namespace Shared.Api.RestResponse
//  */
// export type ApiResponse = {
//   data: unknown
//   status: number
//   headers: Record<string, string | string[] | number | boolean | null>
// }

/**
 * Ошибка REST клиента
 * @namespace Shared.Api.RestError
 */
export type RestError = {
  message: string
  status?: number
  data?: unknown
  code?: string
}
