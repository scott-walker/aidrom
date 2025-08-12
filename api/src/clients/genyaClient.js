import { createClientLogger } from "#utils/logger.js"
import { sendPrompt, PromptResponse } from "#utils/api.js"

// https://gen-api.ru/model/gemini-2-5-flash/api
const NETWORK = "gemini-2-5-flash"
const MODEL = "gemini-2.5-flash-preview-04-17"
const TOKENS = 100

// Создаем логгер для клиента
const logger = createClientLogger("GenyaClient")

/**
 * Отправить запрос к AI
 * @param {String} bot псевдоним бота-бработчика
 * @param {String} prompt текст запроса к AI
 * @returns {Object}
 */
export const send = async (prompt) => {
  try {
    logger.info("Отправка запроса к AI", {
      prompt: prompt,
      network: NETWORK,
      model: MODEL,
      tokens: TOKENS
    })

    // Формируем параметры запроса
    const params = {
      is_sync: true,
      model: MODEL,
      max_tokens: TOKENS,
      messages: [{ role: "user", content: prompt }]
      // stream: false,
      // n: 1,
      // frequency_penalty: 0,
      // presence_penalty: 0,
      // temperature: 1,
      // top_p: 1,
      // response_format: '{"type":"text"}'
    }

    const rawResponse = await sendPrompt(NETWORK, params)

    const { request_id, model, cost } = rawResponse
    const content = rawResponse.response[0].message.content
    const response = new PromptResponse(request_id, model, cost, prompt, content, rawResponse)

    if (model !== MODEL) {
      logger.warn("Модель не соответствует ожидаемой", {
        model,
        expected: MODEL
      })
    }

    logger.info("Ответ от AI получен", { cost })

    return response
  } catch (error) {
    logger.error("Ошибка при отправке запроса к AI", error)

    throw error
  }
}
