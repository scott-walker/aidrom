/**
 * Агент "Genya" для работы с Gemini через GenAPI
 * @namespace Agent.genyaAgent
 * @see {@link file://./../../../docs/AGENT_GENYA.md} Документация агента Genya
 * @see {@link https://gen-api.ru/model/gemini-2-5-flash/api} Документация API GenAPI
 */

import { createAgentLogger } from "#utils/logger.js"
import {
  GenAPI,
  AgentInteraction,
  MOVED_AGENT_MESSAGE
} from "#utils/api/index.js"

const PROVIDER = "GenAPI"
const NETWORK = "gemini-2-5-flash"
const MODEL = "gemini-2.5-flash-preview-04-17"
const TOKENS = 100
const TEMPERATURE = 0.1

// Создаем логгер для клиента
const logger = createAgentLogger("genya")

/**
 * Отправить запрос к AI
 * @param {String} clientMessage - сообщение от клиента
 * @param {Object} clientParams - параметры запроса от клиента
 * @returns {Object}
 */
export const send = async (clientMessage, clientParams = {}) => {
  try {
    logger.info("Отправка запроса", {
      provider: PROVIDER,
      network: NETWORK,
      model: MODEL,
      tokens: TOKENS,
      temperature: TEMPERATURE,
      clientMessage,
      clientParams
    })

    // Формируем параметры запроса
    const apiParams = {
      is_sync: true,
      model: MODEL,
      max_tokens: TOKENS,
      temperature: TEMPERATURE,
      messages: [{ role: "user", content: clientMessage }]
      // stream: false,
      // n: 1,
      // frequency_penalty: 0,
      // presence_penalty: 0,
      // temperature: 1,
      // top_p: 1,
      // response_format: '{"type":"text"}'
    }

    const agentResponse = await GenAPI.sendPrompt(NETWORK, apiParams)

    const { request_id, cost } = agentResponse
    const agentMessage = agentResponse.response[0].message.content

    // Помечаем сообщение от агента в ответе от API как перемещенное
    agentResponse.response[0].message.content = MOVED_AGENT_MESSAGE

    // Создаем объект для хранения данных о запросе/ответе
    const requestData = new AgentInteraction(
      PROVIDER,
      request_id,
      clientParams,
      clientMessage,
      agentResponse,
      agentMessage,
      cost
    )

    logger.info("Ответ успешно получен", { request_id, cost })

    return requestData
  } catch (error) {
    logger.error("Ошибка при отправке запроса", error)

    throw error
  }
}
