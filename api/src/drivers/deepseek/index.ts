import { createRestClient } from "@utils/api"
import { DriverAdaptedResponse } from "../types"
import { DeepseekDriver, DeepseekDriverConfig, DeepseekDriverRequest, DeepseekDriverResponse } from "./types"
import { createApiLogger } from "@utils/logger"

/**
 * Фабрика драйвера Deepseek
 * @namespace Drivers.Deepseek.createDeepseekDriver
 * @param {DeepseekDriverConfig} config Конфигурация драйвера
 */
export const createDeepseekDriver = (config: DeepseekDriverConfig): DeepseekDriver => {
  const logger = createApiLogger("DeepseekDriver")

  const restClient = createRestClient({
    baseUrl: config.baseUrl,
    apiKey: config.apiKey
  })

  const driver: DeepseekDriver = {
    async sendRequest(request: DeepseekDriverRequest): Promise<DriverAdaptedResponse> {
      logger.info("🚀 Отправка запроса", { request })

      try {
        const { data }: { data: DeepseekDriverResponse } = await restClient.post("chat/completions", request)

        logger.info("Получен ответ", {
          responseId: data.id,
          responseModel: data.model,
          responseUsage: data.usage
        })

        return {
          content: data.choices[0].message.content,
          providerRequestId: data.id,
          requestParams: request,
          responseData: data,
          requestTokens: data.usage.prompt_tokens,
          responseTokens: data.usage.completion_tokens
        }
      } catch (error) {
        logger.error("Ошибка при отправке запроса", { error })

        throw error
      }
    }
  }

  logger.info("Драйвер инициализирован")

  return driver
}
