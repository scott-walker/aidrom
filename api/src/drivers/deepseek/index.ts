import { createRestClient } from "@utils/api"
import { Driver, DriverRequest, DriverResponse } from "../types"
import {
  DeepseekDriverConfig,
  DeepseekDriverModel,
  DeepseekDriverRequest,
  DeepseekDriverResponse,
  DeepseekDriverRole
} from "./types"
import { createApiLogger } from "@utils/logger"

/**
 * Фабрика драйвера Deepseek
 * @namespace Drivers.Deepseek.createDeepseekDriver
 * @param {DeepseekDriverConfig} config Конфигурация драйвера
 */
export const createDeepseekDriver = (config: DeepseekDriverConfig): Driver => {
  const logger = createApiLogger("DeepseekDriver")

  const restClient = createRestClient({
    baseUrl: config.baseUrl,
    apiKey: config.apiKey
  })

  const driver: Driver = {
    /**
     * Отправка запроса к API Deepseek
     * @namespace Drivers.Deepseek.sendRequest
     */
    async sendRequest(request: DriverRequest): Promise<DriverResponse> {
      logger.info("🚀 Отправка запроса", { request })

      try {
        const params = request.params ?? {}
        const driverRequest: DeepseekDriverRequest = {
          model: DeepseekDriverModel.DEEPSEEK_CHAT,
          messages: [
            { role: DeepseekDriverRole.SYSTEM, content: "Отвечай одним предложением" },
            { role: DeepseekDriverRole.USER, content: request.message }
          ],
          ...params
        }

        const data: DeepseekDriverResponse = await restClient.post("chat/completions", driverRequest)

        logger.info("Получен ответ", { id: data.id, model: data.model, usage: data.usage })

        return {
          providerRequestId: data.id,
          requestParams: request,
          responseData: data,
          requestTokens: data.usage.prompt_tokens,
          responseTokens: data.usage.completion_tokens,
          content: data.choices[0].message.content
        }
      } catch (error) {
        logger.error("Ошибка при обработке запроса", { error })

        throw error
      }
    }
  }

  logger.info("Драйвер инициализирован")

  return driver
}
