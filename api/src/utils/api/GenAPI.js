import axios from "axios"
import config from "@config/index.js"
import { createApiLogger } from "@utils/logger.js"

// Создаем логгер для API
const logger = createApiLogger("GenAPI")

// Получаем параметры для интеграции
const { baseUrl, key } = config("integration").GenAPI

// Создаем клиент для отправки запросов к API
// https://gen-api.ru/docs/schema-work#generation
const client = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${key}`
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

/**
 * Получить информацию об аккаунте
 * @returns {Object}
 */
export const getAccount = async () => {
  try {
    logger.info("Получение информации об аккаунте")

    const user = await client.get("user")

    logger.info("Информация об аккаунте получена", {
      userId: user.id,
      balance: user.balance
    })

    return user
  } catch (error) {
    logger.error("Ошибка при получении информации об аккаунте", error)

    throw error
  }
}

/**
 * Отправить запрос к AI
 * @param {String} network - сеть для которой будет отправлен запрос
 * @param {Object} params - параметры запроса
 * @returns {Object}
 */
export const sendPrompt = async (network, params) => {
  try {
    logger.info("Отправка промпта", params)

    const response = await client.post(`networks/${network}`, params)

    return response
  } catch (error) {
    logger.error("Ошибка при отправке промпта", error)

    throw error
  }
}
