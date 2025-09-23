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

/**
 * Тип ошибки API
 * @namespace Shared.Api.ApiError
 */
export type ApiError = {
  statusCode: number
  message: string
  code: string
}
