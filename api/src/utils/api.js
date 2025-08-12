import axios from "axios"
import config from "#config/index.js"
import { apiLogger } from "#utils/logger.js"

// Создаем клиент для отправки запросов к API
// https://gen-api.ru/docs/schema-work#generation
const client = axios.create({
  baseURL: config("genApiBaseUrl"),
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${config("genApiKey")}`
  }
})

// Логирование запросов к API
client.interceptors.request.use((config) => {
  apiLogger.info("Отправка запроса к GenAPI", {
    method: config.method,
    url: config.url,
    data: config.data
  })

  return config
})

// Логирование ответов от API
client.interceptors.response.use(
  (res) => {
    apiLogger.info("Успешный ответ от GenAPI", {
      status: res.status,
      url: res.config.url,
      method: res.config.method,
      data: res.data
    })

    return res.data
  },
  (err) => {
    apiLogger.error("Ошибка GenAPI Client", {
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
    apiLogger.info("Получение информации об аккаунте GenAPI")

    const user = await client.get("user")

    apiLogger.info("Информация об аккаунте получена", {
      userId: user.id,
      balance: user.balance
    })

    return user
  } catch (error) {
    apiLogger.error("Ошибка при получении информации об аккаунте", error)

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
    apiLogger.info("Отправка промпта к GenAPI", params)

    const response = await client.post(`networks/${network}`, params)

    return response
  } catch (error) {
    apiLogger.error("Ошибка при отправке промпта к GenAPI", error)

    throw error
  }
}

/**
 * Класс для хранения ответа от API
 * @param {String} requestId - id запроса
 * @param {String} model - модель, которая была использована
 * @param {String} cost - стоимость запроса
 * @param {String} prompt - промпт, который был отправлен
 * @param {String} content - ответ от API
 * @param {Object} rawResponse - raw ответ от API
 */
export class PromptResponse {
  constructor(requestId, model, cost, prompt, content, rawResponse) {
    // this.requestId = requestId
    this.model = model
    // this.cost = cost
    this.prompt = prompt
    this.content = content
    this.payload = {}
    this.response = {}
    // this.response = rawResponse
  }
}
