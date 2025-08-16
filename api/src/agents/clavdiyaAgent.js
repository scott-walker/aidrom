/**
 * Агент "Clavdiya" для работы с Claude через GenAPI
 * @namespace Agent.clavdiyaAgent
 * @see {@link file://./../../../docs/AGENT_CLAVDIYA.md} Документация агента Clavdiya
 * @see {@link https://gen-api.ru/model/claude-4/api} Документация API GenAPI
 */

import { createAgentLogger } from "#utils/logger.js"
import {
  GenAPI,
  AgentInteraction,
  MOVED_AGENT_MESSAGE
} from "#utils/api/index.js"

const PROVIDER = "GenAPI"
const NETWORK = "claude-4"
const MODEL = "claude-sonnet-4-20250522"
const TOKENS = 100
const TEMPERATURE = 0.1

// Создаем логгер для агента
const logger = createAgentLogger("clavdiya")

/**
 * Отправить запрос к AI
 * @param {String} clientMessage сообщение от клиента
 * @param {Object} clientParams параметры запроса от клиента
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
    const params = {
      is_sync: true,
      model: MODEL,
      max_tokens: TOKENS,
      temperature: TEMPERATURE,
      messages: [
        {
          role: "user",
          content: [{ type: "text", text: clientMessage }]
        }
      ]
      // stream: false,
      // top_p: 1
    }

    const agentResponse = await GenAPI.sendPrompt(NETWORK, params)

    const { request_id, cost } = agentResponse
    const agentMessage = agentResponse.response[0].choices[0].message.content

    // Помечаем сообщение от агента в ответе от API как перемещенное
    agentResponse.response[0].choices[0].message.content = MOVED_AGENT_MESSAGE

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
