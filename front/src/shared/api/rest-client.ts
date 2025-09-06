import axios, { type AxiosInstance, type AxiosResponse, type AxiosError } from "axios"
import type { RestClientConfig, ApiError } from "./types"
import { RestError } from "@shared/api/rest-error"

/**
 * REST-клиент для выполнения запросов к API
 * @namespace Shared.Api.createRestClient
 */
export const createRestClient = (config: RestClientConfig) => {
  const client: AxiosInstance = axios.create({
    baseURL: config.baseURL,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    }
  })

  // Перехватчик запросов
  client.interceptors.request.use(
    config => {
      console.log(`🚀 ${config.method?.toUpperCase()} ${config.url}`)
      return config
    },
    error => Promise.reject(error)
  )

  // Перехватчик ответов
  client.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
      const data = error?.response?.data as ApiError
      const message = data?.message || error.message || "Неизвестная ошибка"
      const statusCode = data?.statusCode || error.response?.status || 500
      const apiError = new RestError(message, statusCode)

      return Promise.reject(apiError)
    }
  )

  return client
}
