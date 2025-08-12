import { createClientLogger } from "#utils/logger.js"
import { sendPrompt, PromptResponse } from "#utils/api.js"

// https://gen-api.ru/model/claude-4/api
const NETWORK = "claude-4"
const MODEL = "claude-sonnet-4-20250522"
const TOKENS = 100

// Создаем логгер для клиента
const logger = createClientLogger("ClavdiyaClient")

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
      network: NETWORK
    })

    // Формируем параметры запроса
    const params = {
      is_sync: true,
      model: MODEL,
      max_tokens: TOKENS,
      messages: [
        {
          role: "user",
          content: [{ type: "text", text: prompt }]
        }
      ]
      // stream: false,
      // max_tokens: 4096,
      // temperature: 1,
      // top_p: 1
    }

    const rawResponse = await sendPrompt(NETWORK, params)

    const { request_id, model, cost } = rawResponse
    const content = rawResponse.response[0].choices[0].message.content
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
