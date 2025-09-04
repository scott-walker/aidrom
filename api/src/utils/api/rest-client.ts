import axios from "axios"
import { createApiLogger } from "@utils/logger.js"
import { RestClientConfig, RestClientFactory } from "./types"

/**
 * Фабрика REST клиента
 * @namespace Utils.Api.createRestClient
 * @param {RestClientConfig} config Конфиг REST клиента
 */
export const createRestClient: RestClientFactory = (config: RestClientConfig) => {
  const logger = createApiLogger("REST")
  const client = axios.create({
    baseURL: config.baseUrl,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${config.apiKey}`
    }
  })

  // Логирование запросов к API
  client.interceptors.request.use(config => {
    logger.info("Отправка запроса к GenAPI", {
      action: "interceptor.request",
      method: config.method,
      url: config.url,
      data: config.data
    })

    return config
  })

  // Логирование ответов от API
  client.interceptors.response.use(
    res => {
      logger.info("Успешный запрос", {
        action: "interceptor.successResponse",
        status: res.status,
        url: res.config.url,
        method: res.config.method,
        data: res.data
      })

      return res.data
    },
    err => {
      logger.error("Ошибка в запросе", {
        action: "interceptor.errorResponse",
        message: err.message,
        status: err.response?.status,
        url: err.config?.url,
        method: err.config?.method,
        responseData: err.response?.data
      })

      throw err
    }
  )

  return client
}
