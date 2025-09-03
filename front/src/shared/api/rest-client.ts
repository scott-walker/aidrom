import axios, { type AxiosInstance, type AxiosResponse, type AxiosError } from "axios"
import type { RestClientConfig, RestError } from "./types"

/**
 * REST-клиент для выполнения запросов к API
 * @namespace Shared.Api.createRestClient
 */
export const createRestClient = (config: RestClientConfig) => {
  const client: AxiosInstance = axios.create({
    baseURL: config.baseURL,
    headers: {
      // Authorization: `Bearer ${config.apiKey}`,
      "Content-Type": "application/json",
      Accept: "application/json"
    }
  })

  // /**
  //  * Обернуть ответ от REST-клиента
  //  */
  // const wrapResponse = (response: AxiosResponse): ApiResponse => {
  //   const headers = response.headers && typeof response.headers.toJSON === "function" ? response.headers.toJSON() : {}

  //   return {
  //     data: response.data,
  //     status: response.status,
  //     headers: headers as ApiResponse["headers"]
  //   }
  // }

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
      const apiError: RestError = {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
        code: error.code
      }
      return Promise.reject(apiError)
    }
  )

  return client
}
