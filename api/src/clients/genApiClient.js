import axios from "axios"
import config from "#config/index.js"
import { aiLogger } from "#utils/logger.js"

const botHandlers = {
  /**
   * https://gen-api.ru/model/gemini-2-5-flash/api
   * @param {String} prompt
   * @returns {Object}
   */
  genya: (prompt) => ({
    network: "gemini-2-5-flash",
    params: {
      is_sync: true,
      messages: [{ role: "user", content: prompt }],
      max_tokens: 200,
      model: "gemini-2.5-flash-preview-04-17"
      // stream: false,
      // n: 1,
      // frequency_penalty: 0,
      // presence_penalty: 0,
      // temperature: 1,
      // top_p: 1,
      // response_format: '{"type":"text"}'
    }
  }),

  /**
   * https://gen-api.ru/model/claude-4/api
   * @param {String} prompt
   * @returns {Object}
   */
  clavdiya: (prompt) => ({
    network: "claude-4",
    params: {
      is_sync: true,
      messages: [
        {
          role: "user",
          content: [{ type: "text", text: prompt }]
        }
      ],
      max_tokens: 200,
      model: "claude-sonnet-4-20250522"
      // stream: false,
      // max_tokens: 4096,
      // temperature: 1,
      // top_p: 1
    }
  })
}

// https://gen-api.ru/docs/schema-work#generation
const client = axios.create({
  baseURL: config("genApiBaseUrl"),
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${config("genApiKey")}`
  }
})

client.interceptors.response.use(
  (res) => {
    aiLogger.info("Успешный ответ от GenAPI", {
      status: res.status,
      url: res.config.url,
      method: res.config.method
    })
    return res.data
  },
  (err) => {
    aiLogger.error("Ошибка GenAPI Client", {
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
 * Получить бота-обработчика запроса
 * @param {String} alias псевдоним бота-бработчика
 * @returns {Function}
 */
const getBotHandler = (alias) => {
  if (!botHandlers.hasOwnProperty(alias)) {
    throw new Error(`Ненайден обработчик промпта "${alias}"`)
  }

  return botHandlers[alias]
}

/**
 * Получить информацию об аккаунте
 * @returns {Object}
 */
export const getAccount = async () => {
  aiLogger.info("Получение информации об аккаунте GenAPI")

  const user = await client.get("user")

  aiLogger.info("Информация об аккаунте получена", {
    userId: user.id,
    balance: user.balance
  })

  return user
}

/**
 * Отправить запрос к AI
 * @param {String} bot псевдоним бота-бработчика
 * @param {String} prompt текст запроса к AI
 * @returns {Object}
 */
export const sendPrompt = async (bot, prompt) => {
  aiLogger.info("Отправка промпта к AI", {
    bot,
    promptLength: prompt.length,
    network: getBotHandler(bot)(prompt).network
  })

  const { network, params } = getBotHandler(bot)(prompt)
  const response = await client.post(`networks/${network}`, params)

  aiLogger.info("Ответ от AI получен", {
    bot,
    model: response.model,
    cost: response.cost,
    resultLength: response.result?.[0]?.length || 0
  })

  return response
}
